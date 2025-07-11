import { useLocalization } from "../../context/locale-context";
import CollectionFormDrawer from "./collection";
import ProductFormDrawer from "./product";

export default function FormDrawer({ reload }: { reload: () => void }) {

  const { type } = useLocalization();

  switch (type) {
    case 'product':
      return <ProductFormDrawer reload={reload} />
    case 'collection':
      return <CollectionFormDrawer reload={reload} />
  }

}