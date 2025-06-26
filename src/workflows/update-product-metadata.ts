import { ProductDTO } from "@medusajs/framework/types";
import { MedusaError, Module, Modules } from "@medusajs/framework/utils";
import { createStep, createWorkflow, StepResponse, WorkflowResponse } from "@medusajs/framework/workflows-sdk"
import { mergeLocalizedData } from "./utils";
import { GetProductStepInput, MerageMetadataStepInput, UpdateProductMetadataWorkflowInput } from "./types";

export const getProduct = createStep(
  "get-product",
  async ({ id }: GetProductStepInput, { container }) => {

    const productModuleService = container.resolve(Modules.PRODUCT)

    const product = await productModuleService.retrieveProduct(id, {
      relations: ['metadata','options', 'options.*']
    }).catch(() => null)

    if (!product) {
      throw new MedusaError(
        MedusaError.Types.NOT_FOUND,
        `Product with id ${id} does not exist`
      )
    }

    return new StepResponse<ProductDTO>(product)
  }
)

const merageMetadata = createStep(
  "merage-metadata",
  async ({ metadata, data }: MerageMetadataStepInput) => {

    if (metadata && metadata?.locale) {
      try {
        const obj = JSON.parse(metadata?.locale as string)

        metadata.locale = JSON.stringify(mergeLocalizedData(obj, data));

        return new StepResponse(metadata)
      } catch (e) {
        throw new MedusaError(
          MedusaError.Types.INVALID_DATA,
          'The `metadata.locale` product parameter error'
        )
      }
    }
    return new StepResponse(metadata)
  }
)

const updateProductMetadataLocale = createStep(
  'update-product-metadata-locale',
  async ({ id, metadata }: any, { container }) => {
    const productModuleService = container.resolve(Modules.PRODUCT)
    const newProduct = productModuleService.updateProducts(id, {
      metadata
    })
    return new StepResponse(newProduct)
  }
)

const updateProductMetadata = createWorkflow(
  "update-product-metadata-locale",
  function (input: UpdateProductMetadataWorkflowInput) {

    // step 1 getProduct
    const product = getProduct(input)
    // step 2 merageMetadata
    const newMetadata = merageMetadata({
      metadata: product.metadata,
      data: input.data
    })

    return new WorkflowResponse(updateProductMetadataLocale({
      id: input.id,
      metadata: newMetadata
    }))
  }
)

export default updateProductMetadata