import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { DetailWidgetProps, AdminProduct } from "@medusajs/framework/types"
// import { LocalizationProvider } from "../context/locale-context";
// import LocaleContainer from "../components/locale-container";

// The widget
const ProductDetailWidget = ({ data }: DetailWidgetProps<AdminProduct>) => {

  // const locale = data.metadata && data.metadata.locale ? data.metadata.locale as string : null


  return (
    <div>SEO</div>
  )
}

// The widget's configurations
export const config = defineWidgetConfig({
  zone: "product_category.details.after"
})

export default ProductDetailWidget