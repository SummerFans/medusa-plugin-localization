import { z } from "zod"

export const LocalizationParamsSchema = z.object({
  product_id: z.string()
})