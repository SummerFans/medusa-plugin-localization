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
  title: zod.string(),
})

export default function CollectionFormDrawer() {

  const dialog = usePrompt()
  const dialogRef = useRef<HTMLButtonElement>(null);
  const { id, type, currentLocale, translation, setMetadataLocale } = useLocalization();

  const [loading, setLoading] = useState(false);

  const form = useForm<zod.infer<typeof schema>>({
    defaultValues: {
      locale: currentLocale?.locale,
      title: translation?.title || ''
    },
  })

  useEffect(() => {
    form.setValue('title', translation?.title)
  }, [translation])


  const handleDeepseek = async (e:any) => {
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
    newLocale[data.locale] = data.title;
    setLoading(true)
    const { collection } = await sdk.admin.productCollection.retrieve(id);
    if (collection.metadata && collection.metadata?.locale) {
      try {
        const obj = JSON.parse(collection.metadata?.locale as string);
        obj[data.locale] = { title: data.title };
        collection.metadata.locale = JSON.stringify(obj);

        await sdk.admin.productCollection.update(id, {
          metadata: collection.metadata,
        })
        setLoading(false)
        dialogRef.current?.click()
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
      <Drawer>
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
                    name="title"
                    render={({ field }) => {
                      return (
                        <div className="flex flex-col space-y-2">
                          <div className="flex items-center gap-x-1">
                            <Label size="small" weight="plus">
                              Title
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