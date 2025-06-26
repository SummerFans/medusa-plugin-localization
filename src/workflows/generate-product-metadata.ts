import { MedusaError, Modules } from "@medusajs/framework/utils"
import { ProductDTO } from '@medusajs/framework/types';
import { createStep, createWorkflow, StepResponse, WorkflowResponse } from "@medusajs/framework/workflows-sdk"
import { GetProductStepInput, GenerateMetadataLocaleStepInput, UpdateProductMetadataWorkflowInput, UpdateProductMetadataStepInput } from "./types"
import { DEEPSEEK_MODULE } from "../modules/deepseek";
import DeepSeekModuleService from "../modules/deepseek/service";
import { getProduct } from "./update-product-metadata";


const generateMetadataLocale = createStep(
  'generate-metadata-locale',
  async ({ product, locale }: GenerateMetadataLocaleStepInput, { container }) => {

    const deepseekModuleService: DeepSeekModuleService = container.resolve(DEEPSEEK_MODULE)

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

    const data = {
      title: product.title || '',
      subtitle: product.subtitle || '',
      material: product.material || '',
      description: product.description || '',
      options,
    }


    const response = await deepseekModuleService.chat([{
      role: 'system',
      content: `You are a professional multilingual translation assistant. Your core task is to deliver accurate and fluent translations while preserving the original text’s meaning, style, and cultural context. returns the same json format`
    }, {
      role: 'user',
      content: `Translate the ${JSON.stringify(data)} JSON value to ${locale} language`
    }]);

    const resMessage = JSON.parse(response.choices[0].message.content);

    const metadata = product?.metadata || {};
    if (product?.metadata?.locale) {
      try {
        const localeObj = JSON.parse(product?.metadata?.locale as string);
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

export const updateProductMetadataLocale = createStep(
  'update-product-metadata-step',
  async ({ id, metadata }: UpdateProductMetadataStepInput, { container }) => {

    const productModuleService = container.resolve(Modules.PRODUCT)

    const newProduct = await productModuleService.updateProducts(id, {
      metadata
    })

    return new StepResponse<ProductDTO>(newProduct)
  }
)

const generateProductMetadata = createWorkflow(
  "generate-product-metadata-workflow",
  function ({ id, locale }: UpdateProductMetadataWorkflowInput) {

    // step 1 getProduct
    const product = getProduct({ id })

    // step 2 generate metadata
    const metadata = generateMetadataLocale({ product, locale })

    // step 3 update product metadata
    return new WorkflowResponse(updateProductMetadataLocale({
      id,
      metadata,
    }))
  }
)


export default generateProductMetadata;