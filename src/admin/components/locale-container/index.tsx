import { Container, Heading } from "@medusajs/ui";
import LocaleSwitch from "../locale-switch";
import FormDrawer from "../form-drawer";
import LocaleTable from "../locale-table";
import SettingDrawer from "../setting-drawer";
import { useLocalization } from "../../context/locale-context";
import TranslationDrawer from "../translation-drawer";

export default function LocaleContainer() {

  const { defaultLocale } = useLocalization();

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading level="h2">Localization</Heading>

        <div className="flex">
          {defaultLocale && (
            <>
              <TranslationDrawer />
              <LocaleSwitch />
              <FormDrawer />
            </>
          )}
          <SettingDrawer />
        </div>
      </div>
      <div>
        <LocaleTable />
      </div>
    </Container>
  )
}




