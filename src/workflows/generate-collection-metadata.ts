import { ContainerRegistrationKeys, MedusaError } from "@medusajs/framework/utils"
import { createStep, createWorkflow, StepResponse, WorkflowResponse } from "@medusajs/framework/workflows-sdk"
import { UpdateProductMetadataWorkflowInput } from "./types"
import { DEEPSEEK_MODULE } from "../modules/deepseek";
import DeepSeekModuleService from "../modules/deepseek/service";
import { getCollection, updateCollectionMetadataLocale } from "./steps/collection-step";


const generateCollectionMetadataLocale = createStep(
  'generate-collection-metadata-locale',
  async ({ collection, locale }: any, { container }) => {

    const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
    const deepseekModuleService: DeepSeekModuleService = container.resolve(DEEPSEEK_MODULE)

    if (deepseekModuleService.unavailable) {
      throw new MedusaError(MedusaError.Types.INVALID_ARGUMENT, 'The api_key parameter is missing, and the deepseek service cannot be used.');
    }

    let seoData = {
      title: '',
      description: ''
    }
    if (collection?.metadata?.seo) {
      try {
        seoData = JSON.parse(collection?.metadata?.seo as string)
      } catch (e) {
        logger.error(`The format of the seo field in the metadata of the ${collection.id} product is incorrect`)
      }
    }

    const data: any = {
      title: collection.title,
      seo_title: seoData.title,
      seo_description: seoData.description
    }


    const response = await deepseekModuleService.chat([{
      role: 'system',
      content: `You are a professional multilingual translation assistant. Your core task is to deliver accurate and fluent translations while preserving the original text’s meaning, style, and cultural context. returns the same json format`
    }, {
      role: 'user',
      content: `Translate the ${JSON.stringify(data)} JSON value to ${locale} language`
    }]);

    const resMessage = JSON.parse(response.choices[0].message.content);

    const metadata = collection?.metadata || {};
    if (collection?.metadata?.locale) {
      try {
        const localeObj = JSON.parse(collection?.metadata?.locale as string);
        localeObj[locale as string] = resMessage;

        metadata.locale = JSON.stringify(localeObj);
      } catch (e) {
        throw new MedusaError(
          MedusaError.Types.INVALID_DATA,
          `${e.message}`
        )
      }
    } else {
      const currentLocaleData = {}
      currentLocaleData[locale as string] = data
      metadata.locale = JSON.stringify(currentLocaleData);
    }

    return new StepResponse<Record<string, unknown>>(metadata)
  }
)



const generateCollectionMetadata = createWorkflow(
  "generate-collection-metadata-workflow",
  function ({ id, locale }: UpdateProductMetadataWorkflowInput) {

    // step 1 getProduct
    const collection = getCollection({ id })

    // step 2 generate metadata
    const metadata = generateCollectionMetadataLocale({ collection, locale })

    // step 3 update product metadata
    return new WorkflowResponse(updateCollectionMetadataLocale({
      id,
      metadata,
    }))
  }
)


export default generateCollectionMetadata;