import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { MedusaError } from "@medusajs/framework/utils";
import updateProductMetadata from "../../../../../workflows/update-product-metadata";
import generateProductMetadata from "../../../../../workflows/generate-product-metadata";


type LocalizationReq = {
  locale: string
}


export async function POST(req: MedusaRequest<LocalizationReq>, res: MedusaResponse) {

  const id = req.params.id;
  const locale = req.body.locale;

  if (!id || !locale) {
    throw new MedusaError(
      MedusaError.Types.INVALID_DATA,
      'The `id` or `locale` parameter error'
    )
  }
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