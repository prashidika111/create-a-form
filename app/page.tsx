"use client"
import * as React from "react"
import FormBuilder from "@/src/components/form_builder"
import FormRenderer from "@/src/components/form_renderer"
import { FormSchema } from "@/src/types"
export default function WorkspacePage() {
  const [compiledSchema, setCompiledSchema] = React.useState<FormSchema | null>(null)
  const [schemaTextDisplay, setSchemaTextDisplay] = React.useState<string>("")
  function handleFormSystemRegistration(newIncomingSchema: FormSchema) {
    setCompiledSchema(newIncomingSchema)
    const formattedJsonTextString = JSON.stringify(newIncomingSchema, null, 4)
    setSchemaTextDisplay(formattedJsonTextString)
  }
  return (
    <div className="min-h-screen bg-zinc-50/50 dark:bg-zinc-950 text-foreground p-6 lg:p-10 space-y-8">
      <header className="border-b pb-4">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
          Create a form
        </h1>
      </header>
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 items-start">
        <div className="xl:col-span-2">
          <FormBuilder onBuildComplete={handleFormSystemRegistration} />
        </div>
        <div className="xl:col-span-2 space-y-6">
          <div>
            <h2 className="text-md font-bold uppercase tracking-wider text-amber-600 mb-2">
              JSON:
            </h2>
            <div className="border p-4 rounded-xl bg-zinc-950 text-zinc-100 font-mono text-xs h-60 overflow-auto shadow-inner">
              {schemaTextDisplay !== "" ? (
                <pre>{schemaTextDisplay}</pre>
              ) : (
                <p className="text-zinc-600 italic">
                  Press 'create form' button to get blueprint objects here.
                </p>
              )}
            </div>
          </div>
          <div>
            <FormRenderer schema={compiledSchema} />
          </div>
        </div>
      </div>
    </div>
  )
}