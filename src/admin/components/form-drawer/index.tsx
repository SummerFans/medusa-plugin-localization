import { useLocalization } from "../../context/locale-context";
import CollectionFormDrawer from "./collection";
import ProductFormDrawer from "./product";

export default function FormDrawer() {

  const { type } = useLocalization();

  switch (type) {
    case 'product':
      return <ProductFormDrawer />
    case 'collection':
      return <CollectionFormDrawer />
  }

}