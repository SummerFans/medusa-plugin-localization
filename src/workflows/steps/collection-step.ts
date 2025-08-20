import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils"
import { ProductCollectionDTO } from '@medusajs/framework/types';
import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"

export const getCollection = createStep(
  'get-collection-step',
  async ({ id }: { id: string }, { container }) => {

    const productModuleService = container.resolve(Modules.PRODUCT)

    const collection = await productModuleService.retrieveProductCollection(id)

    return new StepResponse(collection)
  }
)


export const updateCollectionMetadataLocale = createStep(
  'update-collection-metadata-step',
  async ({ id, metadata }: { id: string; metadata: any }, { container }) => {

    const logger = container.resolve(ContainerRegistrationKeys.LOGGER)

    logger.debug('[STEP] update-collection-metadata-step')
    const productModuleService = container.resolve(Modules.PRODUCT)
    await productModuleService.updateProductCollections(id, {
      metadata
    })
    
    return new StepResponse<ProductCollectionDTO>(await productModuleService.retrieveProductCollection(id))
  }
)