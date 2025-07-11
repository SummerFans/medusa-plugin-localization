import { Modules } from "@medusajs/framework/utils"
import { ProductCategoryDTO } from "@medusajs/framework/types"
import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"

export const getCategories = createStep(
  'get-categories-step',
  async ({ id }: { id: string }, { container }) => {

    const productModuleService = container.resolve(Modules.PRODUCT)

    const categories = await productModuleService.retrieveProductCategory(id)

    return new StepResponse(categories)
  }
)


export const updateCategoriesMetadataLocale = createStep(
  'update-categories-metadata-step',
  async ({ id, metadata }: { id: string; metadata: any }, { container }) => {

    const productModuleService = container.resolve(Modules.PRODUCT)

    const categories = await productModuleService.updateProductCategories(id, {
      metadata
    })

    return new StepResponse<ProductCategoryDTO>(categories)
  }
)