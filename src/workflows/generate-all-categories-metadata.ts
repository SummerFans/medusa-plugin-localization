import { ContainerRegistrationKeys, MedusaError } from "@medusajs/framework/utils"
import { ProductCategoryDTO } from '@medusajs/framework/types';
import { createStep, createWorkflow, StepResponse, WorkflowResponse } from "@medusajs/framework/workflows-sdk"
import { DEEPSEEK_MODULE } from "../modules/deepseek";
import DeepSeekModuleService from "../modules/deepseek/service";
import { getCategories, updateCategoriesMetadataLocale } from "./steps/categories-step";

const generateAllCategoriesMetadataLocale = createStep(
  'generate-all-categories-metadata-locale',
  async ({ categories, locales }: { categories: ProductCategoryDTO, locales: string[] }, { container }) => {

    const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
    const deepseekModuleService: DeepSeekModuleService = container.resolve(DEEPSEEK_MODULE)

    if (deepseekModuleService.unavailable) {
      throw new MedusaError(MedusaError.Types.INVALID_ARGUMENT, 'The api_key parameter is missing, and the deepseek service cannot be used.');
    }

    const data = {
      name: categories.name,
      description: categories.description,
    }

    const startDate = new Date()
    const response = await deepseekModuleService.chat([{
      role: 'system',
      content: `You are a professional multilingual translation assistant. Your core task is to deliver accurate and fluent translations while preserving the original text’s meaning, style, and cultural context. returns the same json format`
    }, {
      role: 'user',
      content: `Translate ${JSON.stringify(data)} JSON value into multiple languages such as ${locales?.join(',')} and return it according to the example format.
      Return to Example format:{'en-US':{"name":"","description":""},"ja-JP":{...}}
      `
    }]);

    const endDate = new Date();
    logger.debug("===== DEEPSEEK TIME ========")
    logger.debug(((endDate.getTime() - startDate.getTime()) / 1000).toFixed(2))

    const responseData = JSON.parse(response.choices[0].message.content) as { [locale: string]: Record<string, never> };

    const metadata = categories?.metadata || {};

    if (categories?.metadata?.locale) {
      try {
        const localeObj = JSON.parse(categories?.metadata?.locale as string);
        locales?.map(locale => {
          localeObj[locale as string] = responseData[locale];
        })
        metadata.locale = JSON.stringify(localeObj);
      } catch (e) {
        throw new MedusaError(
          MedusaError.Types.INVALID_DATA,
          `${e.message}`
        )
      }
    } else {
      // metadata不存在locale
      metadata.locale = JSON.stringify(responseData);
    }
    return new StepResponse<Record<string, unknown>>(metadata)
  }
)

const generateAllCategoriesMetadata = createWorkflow(
  "generate-all-categories-metadata-workflow",
  function ({ id, locales }: { id: string; locales: string[] }) {

    // step 1 getProduct
    const categories = getCategories({ id })

    // step 2 generate metadata
    const metadata = generateAllCategoriesMetadataLocale({ categories, locales })

    // step 3 update product metadata
    return new WorkflowResponse(updateCategoriesMetadataLocale({
      id,
      metadata,
    }))
  }
)


export default generateAllCategoriesMetadata;