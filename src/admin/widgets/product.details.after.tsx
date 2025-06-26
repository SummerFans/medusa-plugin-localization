import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { DetailWidgetProps, AdminProduct } from "@medusajs/framework/types"
import LocaleContainer from "../components/locale-container"
import { LocalizationProvider } from "../context/locale-context"

// The widget
const ProductDetailWidget = ({ data }: DetailWidgetProps<AdminProduct>) => {

  const locale = data.metadata && data.metadata.locale ? data.metadata.locale as string : null

  return (
    <LocalizationProvider id={data.id} source={locale} options={data.options}>
      <LocaleContainer  />
    </LocalizationProvider>
  )
}

// The widget's configurations
export const config = defineWidgetConfig({
  zone: "product.details.after"
})

export default ProductDetailWidget