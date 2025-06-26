import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { MedusaError, MedusaErrorTypes } from "@medusajs/framework/utils";
import generateAllProductMetadata from "../../../../workflows/generate-all-product-metadata";


// POST /admin/plugin/localization?id=xxx
export async function POST(req: MedusaRequest<{ id: string; locales: string[] }>, res: MedusaResponse) {

  const id = req.body.id as string;
  const locales = req.body.locales as string[];
  if (!id||!locales||locales.length==0) {
    throw new MedusaError(
      MedusaError.Types.INVALID_DATA,
      'The `id` or `locales` parameter error'
    )
  }

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
}