import { Adjustments } from "@medusajs/icons";
import { Button, Drawer, IconButton, Label, RadioGroup, usePrompt } from "@medusajs/ui";
import { useRef, useState } from "react";
import { useLocalization } from "../../context/locale-context";
import Flag from 'react-country-flag'

export default function SettingDrawer() {

  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);


  const dialog = usePrompt()

  const dialogRef = useRef<HTMLButtonElement>(null);

  const { countries, defaultLocale, changeDefaultLocale } = useLocalization()

  const [selected, setSelected] = useState<string | null>(null);


  const changeDefaultLocaleHandle = async () => {
    const confirm = await dialog({
      title: "Are you sure?",
      description: "Please confirm this selected"
    })
    if (confirm) {
      if (selected) {
        if (await changeDefaultLocale(selected)) {
          setIsOpen(false)
          setLoading(false)
        } else {
          setLoading(false)
        }
      }
    }
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <Drawer.Trigger asChild>
        <IconButton variant="transparent" className="ml-2" ref={dialogRef}>
          <Adjustments />
        </IconButton>
      </Drawer.Trigger>
      <Drawer.Content>
        <Drawer.Description></Drawer.Description>
        <Drawer.Header>
          <Drawer.Title>Setting Localization</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          <h2 className="py-6">Select default national language</h2>
          <RadioGroup defaultValue={defaultLocale} onValueChange={(v) => setSelected(v)} className="grid grid-cols-4 gap-4 py-4">
            {countries && countries.map(c => (
              <div key={c.code} className="flex items-center gap-x-3">
                <RadioGroup.Item value={c.locale} id={`radio_${c.code}`} />
                <Label htmlFor={`radio_${c.code}`} className="w-full" weight="plus">
                  <Flag style={{ fontSize: '1.5rem' }} countryCode={c.code} />
                </Label>
              </div>
            ))}
          </RadioGroup>
        </Drawer.Body>
        <Drawer.Footer>
          <div className="flex w-full">
            <div className='flex flex-1 flex-row-reverse' >
              <Button className="ml-4" isLoading={loading} onClick={changeDefaultLocaleHandle}>Save</Button>
              <Drawer.Close asChild>
                <Button variant="secondary" isLoading={loading} >Cancel</Button>
              </Drawer.Close>
            </div>
          </div>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  )
}