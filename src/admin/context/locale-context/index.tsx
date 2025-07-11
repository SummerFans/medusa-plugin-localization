import Cookies from 'js-cookie'
import { createContext, useContext, useEffect, useState } from 'react';
import { useQuery } from "@tanstack/react-query"
import { sdk } from '../../lib/sdk';
import { countries as countriesList, localeTransform } from '../../utils'
import { AdminProductOption } from '@medusajs/framework/types';

const DEFAULT_COOKIE_NAME = '_default_locale';

interface LocaleContext {
  type: 'collection' | 'categories' | 'product';
  defaultLocale: string | undefined;
  changeDefaultLocale: (locale: string) => void;
  id: string;
  metadataLocale: any;
  source: string | null;
  currentLocale: Countrie | null;
  translation: Record<string, never>;
  countries: Countrie[];
  options: AdminProductOption[] | null | undefined,
  changeLocale: (locale: string) => void
  setMetadataLocale: (locale: string) => void;
}

const LocalizationContext = createContext<LocaleContext>({
  type: 'product',
  defaultLocale: 'en-US',
  id: '',
  source: '',    // metadata.locale
  currentLocale: {
    locale: '',
    country: '',
    code: '',
    isExist: false,
  },
  translation: {},
  countries: [],
  metadataLocale: {},
  changeLocale: () => { },
  setMetadataLocale: () => { },
  changeDefaultLocale: () => { },
  options: [],
})

interface LocalizationProviderProps {
  type: 'collection' | 'categories' | 'product'
  id: string;
  children: React.ReactNode;
  source: string | null;
  options?: AdminProductOption[] | null | undefined,
}

export interface Countrie {
  locale: string;
  country: string;
  code: string;
  isExist: boolean
}

export const LocalizationProvider = ({
  type,
  id,
  source,
  children,
  options
}: LocalizationProviderProps) => {

  const [defaultLocale, setDefaultLocale] = useState<string | undefined>(Cookies.get(DEFAULT_COOKIE_NAME));

  const [metadataLocale, setMetadataLocale] = useState(source)
  const [sourceLocale, setSourceLocale] = useState(localeTransform(metadataLocale));

  const [translation, setTranslation] = useState<Record<string, never>>({})
  const [currentLocale, setCurrentLocale] = useState<Countrie | null>(null);

  const { data: queryResult } = useQuery({
    queryFn: () => sdk.admin.region.list({}),
    queryKey: []
  })

  const countryCodes: string[] = []
  queryResult?.regions.map(region => region.countries?.map(countrie => countryCodes.push(countrie.iso_2 as string)))

  let countries = countryCodes.sort((a, b) => b.localeCompare(a)).map(c => {
    let data = countriesList[c] as any;

    data.isExist = sourceLocale[countriesList[c].locale] && true

    // 选择初始语言
    if (!currentLocale) {
      setCurrentLocale(data);
      setTranslation(sourceLocale[data.locale] as Record<string, never>);
    }
    return {
      locale: data.locale,
      country: data.country,
      code: data.code,
      isExist: data.isExist
    }
  });

  // 改变默认基本语言
  const changeDefaultLocale = (locale: string) => {
    Cookies.set(DEFAULT_COOKIE_NAME, locale);
    setDefaultLocale(locale)
  }

  // 切换语言
  const changeLocale = (locale: string) => {
    let selectCountry = countries.find(country => country.locale == locale) as Countrie;

    // 切换后变更当前语言
    setCurrentLocale(selectCountry);

    // 替换变更后语言metadata.locale数据
    setTranslation(sourceLocale[selectCountry.locale] as Record<string, never> || null);
  }

  useEffect(() => {
    setSourceLocale(localeTransform(metadataLocale))
    // initializeLocale();
    if (currentLocale) {
      setTranslation(localeTransform(metadataLocale)[currentLocale?.locale] as any)
    }

  }, [metadataLocale])

  return (
    <LocalizationContext.Provider value={{ options, metadataLocale, defaultLocale, type, changeDefaultLocale, id, source, currentLocale, changeLocale, setMetadataLocale, countries, translation }}>{children}</LocalizationContext.Provider>
  )
}

export const useLocalization = () => {
  const context = useContext(LocalizationContext)
  if (context === null) {
    throw new Error("useLocalization must be used within a LocalizationProvider")
  }
  return context
}