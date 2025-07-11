import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { MedusaError } from "@medusajs/framework/utils";
import generateAllProductMetadata from "../../../../workflows/generate-all-product-metadata";
import generateAllCollectionMetadata from "../../../../workflows/generate-all-collection-metadata";
import generateAllCategoriesMetadata from "../../../../workflows/generate-all-categories-metadata";


// POST /admin/plugin/localization?id=xxx
export async function POST(req: MedusaRequest<{ id: string; locales: string[]; type: 'collection' | 'product' | 'categories' }>, res: MedusaResponse) {

  const id = req.body.id as string;
  const type = req.body.type;
  const locales = req.body.locales as string[];
  if (!id || !locales || locales.length == 0 || !type) {
    throw new MedusaError(
      MedusaError.Types.INVALID_DATA,
      'The `id`, `locales` or `type` parameter error'
    )
  }

  switch (type) {
    case 'collection':
      try {
        const { result } = await generateAllCollectionMetadata(req.scope).run({ input: { id, locales } })
        return res.json({
          data: result,
        })
      } catch (e) {
        throw new MedusaError(
          MedusaError.Types.UNEXPECTED_STATE,
          `${e.message}`
        )
      }
    case 'product':
      try {
        const { result } = await generateAllProductMetadata(req.scope).run({ input: { id, locales } })
        return res.json({
          data: result,
        })
      } catch (e) {
        throw new MedusaError(
          MedusaError.Types.UNEXPECTED_STATE,
          `${e.message}`
        )
      }
    case 'categories':
      try {
        const { result } = await generateAllCategoriesMetadata(req.scope).run({ input: { id, locales } })
        return res.json({
          data: result,
        })
      } catch (e) {
        throw new MedusaError(
          MedusaError.Types.UNEXPECTED_STATE,
          `${e.message}`
        )
      }
    default:
      throw new MedusaError(
        MedusaError.Types.UNEXPECTED_STATE,
        `${type} type is not supported`
      )
  }


}