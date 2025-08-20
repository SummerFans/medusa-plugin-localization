import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { MedusaError, Modules } from "@medusajs/framework/utils";

const LOCALE_CODE_COOKIE = 'LOCALE_CODE_COOKIE'

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
) {
  const cacheModuleService = req.scope.resolve(Modules.CACHE)

  const localeCode = await cacheModuleService.get(LOCALE_CODE_COOKIE) || ''

  res.json({
    locale_code: localeCode
  })
}


export async function PUT(
  req: MedusaRequest<{ locale_code: string }>,
  res: MedusaResponse
) {

  if (!req.body.locale_code) {
    throw new MedusaError(
      MedusaError.Types.INVALID_DATA,
      'The `locale_code` parameter error'
    )
  }

  const cacheModuleService = req.scope.resolve(Modules.CACHE)
  await cacheModuleService.set(LOCALE_CODE_COOKIE, req.body.locale_code, 31104000)

  res.json({
    success: true
  })
}