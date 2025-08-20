import * as zod from "zod"
import { PencilSquare } from "@medusajs/icons";
import { useLocalization } from "../../../context/locale-context";
import { Controller, FormProvider, useForm } from "react-hook-form"
import { Button, clx, Drawer, IconButton, Input, Label, usePrompt, toast, Badge } from "@medusajs/ui";
import { useEffect, useRef, useState } from "react";
import DeepseekIcon from "../../../icons/deepseek";
import { sdk } from "../../../lib/sdk";

declare const __BACKEND_URL__: string;

const schema = zod.object({
  locale: zod.string(),
  name: zod.string(),
  seo_name: zod.string(),
  description: zod.string(),
  seo_description: zod.string()
})

export default function CategoriesFormDrawer() {

  const [open, setOpen] = useState(false);

  const dialog = usePrompt()
  const dialogRef = useRef<HTMLButtonElement>(null);
  const { id, type, currentLocale, translation, setMetadataLocale } = useLocalization();

  const [loading, setLoading] = useState(false);


  const form = useForm<zod.infer<typeof schema>>({
    defaultValues: {
      locale: currentLocale?.locale,
      name: translation?.name || '',
      seo_name: translation?.seo_name || '',
      description: translation?.description || '',
      seo_description: translation?.seo_description || '',
    },
  })

  useEffect(() => {
    form.setValue('name', translation?.name)
    form.setValue('seo_name', translation?.seo_name)
    form.setValue('description', translation?.description)
    form.setValue('seo_description', translation?.seo_description)
  }, [translation])


  const handleDeepseek = async (e: any) => {
    e.stopPropagation()
    const confirmed = await dialog({
      title: "Are you sure?",
      description: "Please confirm this action",
    })

    if (confirmed) {
      try {
        setLoading(true)
        const res = await fetch(`${__BACKEND_URL__ || ''}/admin/plugin/localization/${id}`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify({ type, locale: currentLocale?.locale })
        })

        const { data, message } = await res.json();
        setLoading(false)
        if (res.status !== 200) {
          return toast.error(message)
        }

        setMetadataLocale(data.metadata.locale)
        dialogRef.current?.click()
      } catch (e: unknown) {
        setLoading(false)
        if (e instanceof Error) {
          toast.error(e.message)
        }
      }
    }

  }

  const handleSubmit = form.handleSubmit(async (data) => {
    data.locale = currentLocale?.locale as string;
    let newLocale: any = {}
    newLocale[data.locale] = data.name;
    setLoading(true)
    const { product_category: category } = await sdk.admin.productCategory.retrieve(id);
    if (category.metadata && category.metadata?.locale) {
      try {
        const obj = JSON.parse(category.metadata?.locale as string);
        obj[data.locale] = { name: data.name, description: data.description, seo_name: data.seo_name, seo_description: data.seo_description };
        category.metadata.locale = JSON.stringify(obj);

        const { product_category } = await sdk.admin.productCategory.update(id, {
          metadata: category.metadata,
        })

        setMetadataLocale(product_category.metadata?.locale as string)
        setLoading(false)
        setOpen(false);
      } catch (e) {
        setLoading(false)
        if (e instanceof Error) {
          toast.error(e.message)
        }
      }
    }

  })


  return (
    <div className="pl-2">
      <Drawer open={open} onOpenChange={() => setOpen(!open)}>
        <Drawer.Trigger asChild>
          <IconButton ref={dialogRef}>
            <PencilSquare />
          </IconButton>
        </Drawer.Trigger>
        <Drawer.Content>
          <Drawer.Description></Drawer.Description>
          <FormProvider {...form}>
            <form
              onSubmit={handleSubmit}
              className="flex flex-1 flex-col overflow-hidden"
            >
              <Drawer.Header>
                <Drawer.Title>Edit Localization <Badge size="xsmall" color="green">{currentLocale?.country}</Badge></Drawer.Title>
              </Drawer.Header>
              <Drawer.Body className="p-4">

                <div className="flex flex-col gap-4">
                  <Controller
                    control={form.control}
                    name="name"
                    render={({ field }) => {
                      return (
                        <div className="flex flex-col space-y-2">
                          <div className="flex items-center gap-x-1">
                            <Label size="small" weight="plus">
                              Name
                            </Label>
                          </div>
                          <Input autoComplete="off" dir="auto" {...field} />
                        </div>
                      )
                    }}
                  />


                  <Controller
                    control={form.control}
                    name="seo_name"
                    render={({ field }) => {
                      return (
                        <div className="flex flex-col space-y-2">
                          <div className="flex items-center gap-x-1">
                            <Label size="small" weight="plus">
                              Name (SEO)
                            </Label>
                          </div>
                          <Input autoComplete="off" dir="auto" {...field} />
                        </div>
                      )
                    }}
                  />

                  <Controller
                    control={form.control}
                    name="description"
                    render={({ field }) => {
                      return (
                        <div className="flex flex-col space-y-2">
                          <div className="flex items-center gap-x-1">
                            <Label size="small" weight="plus">
                              Description
                            </Label>
                          </div>
                          <Input autoComplete="off" dir="auto" {...field} />
                        </div>
                      )
                    }}
                  />

                  <Controller
                    control={form.control}
                    name="seo_description"
                    render={({ field }) => {
                      return (
                        <div className="flex flex-col space-y-2">
                          <div className="flex items-center gap-x-1">
                            <Label size="small" weight="plus">
                              Description(SEO)
                            </Label>
                          </div>
                          <Input autoComplete="off" dir="auto" {...field} />
                        </div>
                      )
                    }}
                  />
                </div>


              </Drawer.Body>
              <Drawer.Footer>
                <div className="flex w-full">
                  <div className="flex flex-1">
                    <IconButton title="Automatic translation" isLoading={loading} onClick={handleDeepseek} variant="transparent" type="button">
                      <DeepseekIcon />
                    </IconButton>
                  </div>
                  <div className={clx('flex flex-1 flex-row-reverse', { 'hidden': loading })} >
                    <Button className="ml-4" isLoading={loading}>Save</Button>
                    <Drawer.Close asChild>
                      <Button variant="secondary" isLoading={loading}>Cancel</Button>
                    </Drawer.Close>
                  </div>
                </div>
              </Drawer.Footer>
            </form>
          </FormProvider>
        </Drawer.Content>
      </Drawer>
    </div>
  )
}