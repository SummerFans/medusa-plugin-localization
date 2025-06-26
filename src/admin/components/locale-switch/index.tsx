import Flag from 'react-country-flag'
import { Select } from "@medusajs/ui";
import { useLocalization } from '../../context/locale-context';

export default function LocaleSwitch() {

  const { countries, currentLocale, defaultLocale, changeLocale } = useLocalization();

  return currentLocale ? (
    <div className='w-16'>
      <Select defaultValue={currentLocale?.locale} onValueChange={changeLocale}>
        <Select.Trigger>
          <Select.Value placeholder={"Select Country"} />
        </Select.Trigger>
        <Select.Content>
          {countries.filter((countrie) => countrie.locale != defaultLocale).map((countrie) => (
            <Select.Item key={countrie.code} className="align-left" value={countrie.locale}>
              <Flag style={{ fontSize: '1.5rem' }} countryCode={countrie.code} />
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
    </div>
  ) : ''
}