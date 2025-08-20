import { ContainerRegistrationKeys, MedusaError, Modules } from "@medusajs/framework/utils"
import { createStep, createWorkflow, StepResponse, WorkflowResponse } from "@medusajs/framework/workflows-sdk"
import { GenerateAllMetadataLocaleStepInput, UpdateProductMetadataWorkflowInput, UpdateProductMetadataStepInput } from "./types"
import { DEEPSEEK_MODULE } from "../modules/deepseek";
import DeepSeekModuleService from "../modules/deepseek/service";
import { getProduct } from "./update-product-metadata";
import { updateProductMetadataLocale } from "./generate-product-metadata";

const generateAllMetadataLocale = createStep(
  'generate-all-metadata-locale',
  async ({ product, locales }: GenerateAllMetadataLocaleStepInput, { container }) => {

    const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
    const cacheModuleService = container.resolve(Modules.CACHE)
    const deepseekModuleService: DeepSeekModuleService = container.resolve(DEEPSEEK_MODULE)

    const currentLocaleCode = cacheModuleService.get('LOCALE_CODE_COOKIE')
    if (!currentLocaleCode) {
      throw new MedusaError(MedusaError.Types.INVALID_ARGUMENT, 'The default language does not exist');
    }


    if (deepseekModuleService.unavailable) {
      throw new MedusaError(MedusaError.Types.INVALID_ARGUMENT, 'The api_key parameter is missing, and the deepseek service cannot be used.');
    }

    const options: any = [];

    product.options && product.options.map(option => {
      const p = {}

      p[option.id] = option.title
      p['values'] = {};
      option.values && option.values.map(v => {
        p['values'][v.id] = v.value
      })

      options.push(p);
    })

    let seoData = {
      title: '',
      description: ''
    }
    if (product?.metadata?.seo) {
      try {
        seoData = JSON.parse(product?.metadata?.seo as string)
      } catch (e) {
        logger.error(`The format of the seo field in the metadata of the ${product.id} product is incorrect`)
      }
    }


    const data = {
      title: product.title || '',
      seo_title: seoData.title || '',
      subtitle: product.subtitle || '',
      material: product.material || '',
      description: product.description || '',
      seo_description: seoData.description || '',
      options,
    }



    const response = await deepseekModuleService.chat([{
      role: 'system',
      content: `You are a professional multilingual translation assistant. Your core task is to deliver accurate and fluent translations while preserving the original text’s meaning, style, and cultural context. returns the same json format`
    }, {
      role: 'user',
      content: `Translate ${JSON.stringify(data)} JSON value into multiple languages such as ${locales?.join(',')} and return it according to the example format.
      Return to Example format:{'en-US':{ "title":"","subtitle": "","material": "","description":"","options": [{"opt_xx": "Color","values": {"optval_x1": "","optval_x2": ""}}]},"ja-JP":{...}}
      `
    }]);

    const responseData = JSON.parse(response.choices[0].message.content) as { [locale: string]: Record<string, never> };


    const metadata = product?.metadata || {};

    if (product?.metadata?.locale) {
      // 如果metadata存在locale
      try {
        const localeObj = JSON.parse(product?.metadata?.locale as string);
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

const generateAllProductMetadata = createWorkflow(
  "generate-all-product-metadata-workflow",
  function ({ id, locales }: UpdateProductMetadataWorkflowInput) {

    // step 1 getProduct
    const product = getProduct({ id })

    // step 2 generate metadata
    const metadata = generateAllMetadataLocale({ product, locales })

    // step 3 update product metadata
    return new WorkflowResponse(updateProductMetadataLocale({
      id,
      metadata,
    }))
  }
)


export default generateAllProductMetadata;