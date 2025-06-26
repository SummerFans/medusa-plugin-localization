import { Badge, Button, Label, RadioGroup, Table, usePrompt } from "@medusajs/ui";
import { useLocalization } from '../../context/locale-context';
import { InformationCircle } from "@medusajs/icons";
import Flag from "react-country-flag";
import { useState } from "react";
import Cookies from 'js-cookie';

export default function LocaleTable() {

  const { translation, defaultLocale } = useLocalization();

  return translation && defaultLocale ? (
    <Table className="w-full">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell width={150}>Fields</Table.HeaderCell>
          <Table.HeaderCell>Translation</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>

        <Table.Row>
          <Table.Cell>Title</Table.Cell>
          <Table.Cell className="py-2" dir="auto">{translation.title}</Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.Cell>Subtitle</Table.Cell>
          <Table.Cell className="py-2" dir="auto">{translation.subtitle}</Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.Cell>Description</Table.Cell>
          <Table.Cell className="py-2" dir="auto">{translation.description}</Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.Cell>Material</Table.Cell>
          <Table.Cell className="py-2" dir="auto">{translation.material}</Table.Cell>
        </Table.Row>

        {(translation?.options as [])?.map((option: any, index: number) => (
          <Table.Row key={index}>
            <Table.Cell dir="auto">{option[Object.keys(option)[0]]}</Table.Cell>
            <Table.Cell dir="auto">
              {Object.keys(option.values).map(v => (
                <Badge size="xsmall" key={v} className="mr-2">{(option.values[v])}</Badge>
              ))}
            </Table.Cell>
          </Table.Row>
        ))}

      </Table.Body>
    </Table>
  ) : (defaultLocale ? <NotLocalization /> : <NotDefaultLocalization />)
}

function NotLocalization() {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <p><InformationCircle /></p>
      <p className="text-sm py-2">No records</p>
      <p className="text-sm text-white/50">There are no records to show</p>
    </div>
  )
}

function NotDefaultLocalization() {

  const dialog = usePrompt();

  const [selected, setSelected] = useState<string | null>(null);
  const { countries, changeDefaultLocale } = useLocalization();

  const saveDefaultLocaleHandle = async () => {

    const confirm = await dialog({
      title: "Are you sure?",
      description: "Please confirm this selected"
    })
    if (confirm) {
      if (selected) {
        changeDefaultLocale(selected);
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <p><InformationCircle /></p>
      <p className="text-sm py-2">Select the default language</p>

      {countries && (<RadioGroup onValueChange={(v) => setSelected(v)} className=" grid grid-cols-8 gap-4 p-4">
        {countries && countries.map(c => (
          <div key={c.code} className="flex items-center gap-x-3">
            <RadioGroup.Item value={c.locale} id={`radio_${c.code}`} />
            <Label htmlFor={`radio_${c.code}`} className="w-full" weight="plus">
              <Flag style={{ fontSize: '1.5rem' }} countryCode={c.code} />
            </Label>
          </div>

        ))}
      </RadioGroup>
      )}
      <div>
        <Button disabled={!selected} onClick={saveDefaultLocaleHandle} variant="secondary">Confirm</Button>
      </div>
    </div>
  )
}
