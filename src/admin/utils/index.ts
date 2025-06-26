import { AdminProductOption } from '@medusajs/framework/types';
import countries from './countries';

interface OutputOption {
  id: string;
  name: string;
  source_name: string;
  values: {
    id: string;
    value: string;
    source_value: string;
  }[];
}

interface ValueTranslations {
  [valueId: string]: string;
}

interface OptionTranslation {
  optionName: string;
  values: ValueTranslations;
}


interface MatadataLocaleData {
  [locale: string]: {
    title: string;
    subtitle: string;
    description: string;
    options: {
      [optionId: string]: string;
      values: any;
    }[]
  }
}

interface InputTranslation {
  [optionId: string]: OptionTranslation;
}

const optionsTransform = (sourceOptions: AdminProductOption[] | null | undefined, translateOptions: InputTranslation[] | null): OutputOption[] => {

  if (translateOptions) {
    return sourceOptions?.map((option: any) => {
      const t = (translateOptions as []).find(t => t[option.id] !== undefined) as any;

      return {
        id: option.id,
        name: t ? t[option.id] : option.title,
        source_name: option.title,
        values: option.values.map((value: any) => {
          return {
            id: value.id,
            value: t && t.values[value.id] ? t.values[value.id] : value.value,
            source_value: value.value
          };
        })
      }
    }) as OutputOption[]
  } else {

    return sourceOptions?.map((option: any) => {
      return {
        id: option.id,
        name: '',
        source_name: option.title,
        values: option.values.map((value: any) => {
          return {
            id: value.id,
            value: '',
            source_value: value.value
          };
        })
      }
    }) as OutputOption[]
  }
}

const localeTransform = (locale: string | null): Record<string, unknown> => {
  if (!locale) {
    return {}
  }
  try {
    return JSON.parse(locale);
  } catch (e) {
    return {}
  }
}

const convertingMetadataVal = (data: any): MatadataLocaleData => {

  const result: TransformedData = {
    [data.locale]: {
      title: data.title,
      subtitle: data.subtitle,
      material: data.material,
      description: data.description,
      options: [],
    },
  };

  if (data.options) {
    data.options.forEach((option: any) => {
      const transformedOption: TransformedOption = {
        [option.id]: option.name,
        values: {},
      };

      option.values.forEach((value: any) => {
        transformedOption.values[value.id] = value.value;
      });

      result[data.locale].options.push(transformedOption);
    });
  }


  return result
}

export {
  localeTransform,
  countries,
  optionsTransform,
  convertingMetadataVal
}