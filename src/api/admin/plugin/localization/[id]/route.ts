import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { MedusaError } from "@medusajs/framework/utils";
import updateProductMetadata from "../../../../../workflows/update-product-metadata";
import generateProductMetadata from "../../../../../workflows/generate-product-metadata";
import generateCollectionMetadata from "../../../../../workflows/generate-collection-metadata";


type LocalizationReq = {
  locale: string
  type: 'collection' | 'product' | 'categories'
}


export async function POST(req: MedusaRequest<LocalizationReq>, res: MedusaResponse) {

  const id = req.params.id;
  const locale = req.body.locale;
  const type = req.body.type;

  if (!id || !locale || !type) {
    throw new MedusaError(
      MedusaError.Types.INVALID_DATA,
      'The `id`, `locale` or `type` parameter error'
    )
  }

  switch (type) {
    case 'collection':
      try {
        const { result } = await generateCollectionMetadata(req.scope).run({ input: { id, locale } })
        return res.json({
          data: result,
        })
      } catch (e) {
        throw new MedusaError(
          MedusaError.Types.INVALID_DATA,
          `${e.message}`
        )
      }
    case 'product':
      try {
        const { result } = await generateProductMetadata(req.scope).run({ input: { id, locale } })
        return res.json({
          data: result,
        })
      } catch (e) {
        throw new MedusaError(
          MedusaError.Types.INVALID_DATA,
          `${e.message}`
        )
      }
  }

}


export async function PUT(req: MedusaRequest, res: MedusaResponse) {

  const id = req.params.id;

  try {
    const { result } = await updateProductMetadata(req.scope).run({ input: { id, data: req.body } })
    return res.json({
      data: result,
    })
  } catch (e) {
    throw new MedusaError(
      MedusaError.Types.INVALID_DATA,
      `${e.message}`
    )
  }
}