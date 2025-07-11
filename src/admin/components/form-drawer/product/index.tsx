import { PencilSquare } from "@medusajs/icons";
import { Drawer, IconButton, Button, Label, Input, Textarea, Badge, usePrompt, clx, toast } from "@medusajs/ui";
import { Controller, FormProvider, useForm, useFieldArray } from "react-hook-form"
import * as zod from "zod"
import { useLocalization } from "../../../context/locale-context";
import { useEffect, useRef, useState } from "react";
import DeepseekIcon from "../../../icons/deepseek";
import { convertingMetadataVal, optionsTransform } from "../../../utils";

declare const __BACKEND_URL__: string;

const schema = zod.object({
  locale: zod.string(),
  title: zod.string(),
  subtitle: zod.string(),
  description: zod.string(),
  material: zod.string(),
  options: zod.any(),
})

export default function ProductFormDrawer({ reload }: { reload: () => void }) {

  const dialog = usePrompt()

  const dialogRef = useRef<HTMLButtonElement>(null);

  const [loading, setLoading] = useState(false);

  const { id, options, currentLocale, translation, setMetadataLocale } = useLocalization();

  const form = useForm<zod.infer<typeof schema>>({
    defaultValues: {
      locale: currentLocale?.locale,
      title: translation?.title,
      subtitle: translation?.subtitle,
      description: translation?.description,
      material: translation?.material,
      options: optionsTransform(options, translation?.options),
    },
  })

  const { fields } = useFieldArray({
    control: form.control,
    name: 'options',
  })

  const handleDeepseek = async () => {
    const confirmed = await dialog({
      title: "Are you sure?",
      description: "Please confirm this action",
    })

    if (confirmed) {
      setLoading(true)
      try {
        const res = await fetch(`${__BACKEND_URL__ || ''}/admin/plugin/localization/${id}`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify({ locale: currentLocale?.locale })
        })

        const { data, message } = await res.json();
        setLoading(false)
        if (res.status !== 200) {
          return toast.error(message)
        }
        setMetadataLocale(data.metadata.locale)
        reload();
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
    setLoading(true)
    const res = await fetch(`${__BACKEND_URL__ || ''}/admin/plugin/localization/${id}?type=product`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(convertingMetadataVal(data))
    })

    const jsonData = await res.json();
    setMetadataLocale(jsonData.data.metadata.locale)
    setLoading(false)
    reload();
    dialogRef.current?.click()

  })

  useEffect(() => {

    if (translation) {
      form.reset({
        locale: currentLocale?.locale || '',
        title: translation?.title || '',
        subtitle: translation?.subtitle || '',
        description: translation?.description || '',
        material: translation?.material || '',
        options: optionsTransform(options, translation?.options),
      })
    } else {
      form.reset({
        locale: currentLocale?.locale || '',
        title: '',
        subtitle: '',
        description: '',
        material: '',
        options: optionsTransform(options, null),
      })
    }
  }, [translation])

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

                  <Controller
                    control={form.control}
                    name="subtitle"
                    render={({ field }) => {
                      return (
                        <div className="flex flex-col space-y-2">
                          <div className="flex items-center gap-x-1">
                            <Label size="small" weight="plus">
                              Subtitle
                            </Label>
                          </div>
                          <Input autoComplete="off" dir="auto" {...field} />
                        </div>
                      )
                    }}
                  />

                  <Controller
                    control={form.control}
                    name="material"
                    render={({ field }) => {
                      return (
                        <div className="flex flex-col space-y-2">
                          <div className="flex items-center gap-x-1">
                            <Label size="small" weight="plus">
                              Material
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
                          <Textarea autoComplete="off" dir="auto" className="h-32" {...field} />
                        </div>
                      )
                    }}
                  />

                  <h2 className="font-bold">Options</h2>
                  {/* options */}
                  {fields.map((option: any, index: number) => (
                    <div key={option.id}>
                      <Controller
                        control={form.control}
                        name={`options.${index}.name`}
                        render={({ field }) => {
                          return (
                            <div className="flex flex-col space-y-2">
                              <div className="flex items-center gap-x-1">
                                <Label size="small" weight="plus">
                                  <Badge size="xsmall" color="purple">{option.source_name}</Badge>
                                </Label>
                              </div>
                              <Input autoComplete="off" dir="auto" {...field} />
                            </div>
                          )
                        }}
                      />
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        {(option.values as []).map((v: any, vIndex: number) => (
                          <div key={v.id}>
                            <Controller
                              control={form.control}
                              name={`options.${index}.values.${vIndex}.value`}
                              render={({ field }) => {
                                return (
                                  <div className="flex flex-col space-y-2">
                                    <div className="flex items-center gap-x-1">
                                      <Badge size="xsmall" color="blue">{v.source_value}</Badge>
                                    </div>
                                    <Input autoComplete="off" dir="auto" {...field} />
                                  </div>
                                )
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
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