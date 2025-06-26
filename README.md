# Medusa Plugin Localization

The `medusa-plugin-localization` is a localization plugin for Medusa v2. The plugin stores localized content in the product's metadata. The frontend displays the localized language based on the current language setting. The plugin also supports automatic translation of localized languages using DeepSeek (requiring a DeepSeek API key). If no API key is available, localized languages need to be stored separately

### Admin Demo
[![admin demo]](https://github.com/user-attachments/assets/ea2c94b3-17ef-4a88-8bec-f063fed36f70)

### Front-end Demo
[![Front-end Demo]](https://github.com/user-attachments/assets/7832520d-1f9e-4263-8d6a-261c81a8e1f6)

### Dependency Version
```
"@medusajs/medusa": "2.7.0+",
```

### Install
```
npm i medusa-plugin-localization
```

### medusa-config.js

```
modules: [
    {
      resolve: "./src/modules/deepseek",
      options: {
        api_key: process.env.DEEPSEEK_API_KEY, // Not required
      },
    }
  ]
```

## Front-end

For frontend localization, I use `next-intl`([Doc:Without-i18n-routing](https://.dev/docs/getting-started/app-router/without-i18n-routing)) and retrieve the current locale value with `const locale = await getLocale();`. Then I specifically developed a `<I18nTitle metadata={product.metadata} defaultTitle={product.title} />` component to render the title value.

### I18nTitle Component Example
```ts
import { getLocale } from 'next-intl/server';

type I18nTitleProps = {
  metadata: Record<string, unknown> | null | undefined;
  defaultTitle: string;
}
const I18nTitle = async ({ metadata, defaultTitle }: I18nTitleProps) => {
  const locale = await getLocale();

  if (!metadata || !metadata?.locale) return defaultTitle
  try {
    const localeMaps = JSON.parse(metadata?.locale as string) || {}
    return localeMaps[locale]?.title || defaultTitle
  } catch (_) {
    
    return defaultTitle
  }
}

export default I18nTitle;
```

### Compoent Using
```ts
// src/modules/products/templates/product-info/index.tsx

// Before
<Heading level="h2" className="text-3xl leading-10 text-ui-fg-base" >
    {product.title}
</Heading>

// After
<Heading level="h2" className="text-3xl leading-10 text-ui-fg-base" >
  <I18nTitle metadata={product.metadata} defaultTitle={product.title} />
</Heading>
```

Create Function @/lib/util/get-i18n
```ts
import { getLocale } from "next-intl/server";

async function getI18n(metadata: { locale?: string } | null | undefined): Promise<Record<string, string> | null> {
  if (!metadata || !metadata.locale) {
    return null;
  }
  const localeCode = await getLocale();
  try {
    const localeObj = JSON.parse(metadata.locale);
    return localeObj[localeCode]
  } catch (e) {
    return null
  }
}

export default getI18n;
```
### `generateMetadata` Using
```ts
export async function generateMetadata(props: Props): Promise<Metadata> {
  // ...

  const localeData = await getI18n(product.metadata);
  if (localeData) {
    return {
      title: localeData.title?localeData.title:product.title,
      description: localeData.description?localeData.description:product.description,
      openGraph: {
        title: localeData.title?localeData.title:product.title,
        description: localeData.title?localeData.description:product.description||'',
        images: product.thumbnail ? [product.thumbnail] : [],
      },
    }
  }
  return {
    title: `${product.title} `,
    description: `${product.title}`,
    openGraph: {
      title: `${product.title}`,
      description: `${product.title}`,
      images: product.thumbnail ? [product.thumbnail] : [],
    },
  }
}
```