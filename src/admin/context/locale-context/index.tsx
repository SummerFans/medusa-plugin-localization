import { createContext, useContext, useEffect, useState } from 'react';
import { useQuery } from "@tanstack/react-query"
import { sdk } from '../../lib/sdk';
import { countries as countriesList, localeTransform } from '../../utils'
import { AdminProductOption } from '@medusajs/framework/types';
import { toast } from '@medusajs/ui';

declare const __BACKEND_URL__: string;
interface LocaleContext {
  type: 'collection' | 'categories' | 'product';
  defaultLocale: string | undefined;
  changeDefaultLocale: (locale: string) => Promise<boolean>;
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

const updateCurrentLocaleCode = async (localeCode: string) => {
  const res = await fetch(`${__BACKEND_URL__ || ''}/admin/plugin/localization/current`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      locale_code: localeCode
    })
  })

  try {
    return await res.json();
  } catch (e: any) {
    toast.error("Error", {
      description: e.message,
    })
  }
}

const getCurrentLocaleCode = async () => {
  const res = await fetch(`${__BACKEND_URL__ || ''}/admin/plugin/localization/current`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      "content-type": "application/json"
    }
  })

  try {
    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e);
    return {}
  }

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
  changeDefaultLocale: () => Promise.resolve().then(() => true),
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


  const [defaultLocale, setDefaultLocale] = useState<string | undefined>('');
  const [metadataLocale, setMetadataLocale] = useState(source)
  const [sourceLocale, setSourceLocale] = useState(localeTransform(metadataLocale));

  const [translation, setTranslation] = useState<Record<string, never>>({})
  const [currentLocale, setCurrentLocale] = useState<Countrie | null>(null);

  const { data: countriesCodes } = useQuery({
    queryFn: () => sdk.admin.region.list({}).then(({ regions }) => regions.map((region) => region.countries?.map((countrie) => countrie.iso_2)).flat(2)),
    queryKey: ['countrie', 'all']
  })

  // 使用 useQuery 替换所有手动的 useState 和 useEffect 逻辑
  const {
    data: localeCode
  } = useQuery<any, Error>({
    queryKey: ['current_locale'],   // 数据的唯一缓存键
    queryFn: getCurrentLocaleCode,  // 数据获取函数
  });

  // 使用 useMemo 优化 value 对象，防止不必要的重渲染
  // 只有当 useQuery 返回的值变化时，value 对象才会重新创建

  // const value = useMemo(() => ({
  //   localeCode,
  //   isLoading,
  //   error,
  //   refetch,
  // }), [localeCode, isLoading, error, refetch]);


  const countryCodes: string[] = (countriesCodes as any) || []

  let countries = countryCodes?.sort((a, b) => b.localeCompare(a)).map(c => {
    let data = countriesList[c] as any;

    data.isExist = sourceLocale[countriesList[c].locale] ? true : false

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
  const changeDefaultLocale = async (locale: string): Promise<boolean> => {
    await updateCurrentLocaleCode(locale)
    setDefaultLocale(locale)
    return true
  }

  // 切换语言
  const changeLocale = (locale: string) => {
    let selectCountry = countries.find(country => country.locale == locale) as Countrie;

    // 切换后变更当前语言
    setCurrentLocale(selectCountry);

    // 替换变更后语言metadata.locale数据
    setTranslation(sourceLocale[selectCountry.locale] as Record<string, never> || null);
  }


  // const fetchData = useCallback(async () => {
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     const data = await fetchUserData();
  //     setUser(data);
  //   } catch (err) {
  //     setError(err.message);
  //     setUser(null); // 清除旧数据
  //   } finally {
  //     setLoading(false);
  //   }
  // }, []);


  useEffect(() => {
    setDefaultLocale(localeCode?.locale_code);


    setSourceLocale(localeTransform(metadataLocale))
    // initializeLocale();
    if (currentLocale) {
      setTranslation(localeTransform(metadataLocale)[currentLocale?.locale] as any)
    }

  }, [metadataLocale, localeCode])

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