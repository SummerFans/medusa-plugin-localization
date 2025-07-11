import { Button, Checkbox, clx, Drawer, Heading, IconButton, Label, StatusBadge, toast, usePrompt } from "@medusajs/ui";
import { useEffect, useRef, useState } from "react";
import DeepseekIcon from "../../icons/deepseek";
import { useLocalization } from "../../context/locale-context";
import Flag from 'react-country-flag'

declare const __BACKEND_URL__: string;


export default function TranslationDrawer() {

  const dialog = usePrompt();
  const dialogRef = useRef<HTMLButtonElement>(null);
  const { id, type, countries, defaultLocale, setMetadataLocale } = useLocalization()

  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  const checkedHandle = (checked: any, locale: string) => {

    let newSelected;
    if (checked) {
      newSelected = [...selected, locale];
    } else {
      newSelected = selected.filter(l => l != locale);

    }
    setSelected(newSelected)

  }

  const translationHandle = async (e: any) => {
    e.stopPropagation();
    const confirm = await dialog({
      title: "Are you sure?",
      description: `Are you sure you can translate into ${selected.length} languages?`
    })
    if (confirm) {
      setLoading(true);
      try {
        const res = await fetch(`${__BACKEND_URL__ || ''}/admin/plugin/localization`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify({ id, locales: selected, type })
        })

        const { message, data } = await res.json();
        setLoading(false)
        if (res.status !== 200) {
          return toast.error(message)
        }
        setMetadataLocale(data.metadata.locale)
        dialogRef.current?.click()
      } catch (e: unknown) {
        setLoading(false)
        if (e instanceof Error) {
          toast.error(`${e.message as string}`)
        }
      }
    }
  }

  useEffect(() => {
    const initSelected = () => {
      const _selected: string[] = []
      countries.filter(c => c.locale != defaultLocale).map(c => {
        !c.isExist ? _selected.push(c.locale) : ''
      })
      setSelected(_selected);
    }
    initSelected()
  }, [countries])

  return (
    <Drawer>
      <Drawer.Trigger asChild>
        <IconButton variant="transparent" className="mr-2" ref={dialogRef}>
          <DeepseekIcon />
        </IconButton>
      </Drawer.Trigger>
      <Drawer.Content>
        <Drawer.Description></Drawer.Description>
        <Drawer.Header>
          <Drawer.Title>Translation</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body className={clx('transition delay-300', { "opacity-50": loading })} >
          <Heading level="h2">Select the language for Translation</Heading>
          <div className=" grid grid-cols-5 gap-4 py-4">
            {countries && countries.filter((dc) => dc.locale != defaultLocale).map(c => (
              <div key={c.code} className="flex items-center space-x-2">
                <Checkbox disabled={loading} onCheckedChange={(event) => checkedHandle(event, c.locale)} id={c.code} defaultChecked={!c.isExist} />
                <Label htmlFor={c.code}>
                  <StatusBadge color={c.isExist ? 'green' : 'grey'}><Flag style={{ fontSize: '1.5rem' }} countryCode={c.code} /></StatusBadge>
                </Label>
              </div>
            ))}
          </div>
        </Drawer.Body>

        <Drawer.Footer>
          <div className="flex w-full">

            <div className={clx('flex flex-1 flex-row-reverse')} >
              {/* onClick={translationHandle} */}
              <Button className="ml-4" disabled={selected.length == 0} onClick={translationHandle} isLoading={loading}>Confirm</Button>
              <Drawer.Close asChild>
                <Button variant="secondary" disabled={loading}>Cancel</Button>
              </Drawer.Close>
            </div>
          </div>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  )
}