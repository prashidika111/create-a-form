"use client"
import React, {useState, useEffect} from "react"
import {Button} from "@/src/components/ui/button"
import {Input} from "@/src/components/ui/input"
import {Label} from "@/src/components/ui/label"
import {Select} from "@/src/components/ui/select"
import {FormSchema} from "@/src/types"
interface FormRendererProps 
{
  schema: FormSchema | null
}
export default function FormRenderer({ schema }: FormRendererProps) 
{
  const [data, setData] = useState<Record<string, any>>({})
  const [output, setOutput] = useState("")
  useEffect(() => 
  {
    if (!schema) return
    const initial: Record<string, any> = {}
    schema.fields.forEach((f) => {
      initial[f.id] = f.type === "checkbox" || f.type === "file" ? [] : ""
    })
    setData(initial)
    setOutput("")
  }, [schema])
  if (!schema) 
  {
    return (
      <div className="border-2 border-dashed border-gray-300 p-7 rounded-xl text-center italic">
        <p className="text-gray-600">Created form goes here</p>
      </div>
    )
  }
  function changeValue(id: string, value: any) 
  {
    setData({ ...data, [id]: value })
  }
  function toggleCheckbox(id: string, optId: string) 
  {
    const list = data[id] || []
    const next = list.includes(optId) ? list.filter((v: string) => v !== optId) : [...list, optId]
    changeValue(id, next)
  }
  return (
    <div className="space-y-4">
      <form onSubmit={(e) => { e.preventDefault(); setOutput(JSON.stringify(data, null, 2)) }} className="border p-6 rounded-xl bg-card shadow-sm space-y-4">
        <h2 className="text-xl font-bold tracking-tight border-b pb-2 text-indigo-500">
          {schema.title}
        </h2>
        {schema.fields.map((f) => (
          <div key={f.id}>
            <Label>{f.label}</Label>
            {f.type === "text" && (
              <Input
                value={data[f.id] || ""}
                placeholder={f.placeholder}
                onChange={(e) => changeValue(f.id, e.target.value)}
              />
            )}
            {f.type === "select" && (
              <Select
                value={data[f.id] || ""}
                options={f.options}
                placeholder="Select option..."
                onChange={(val) => changeValue(f.id, val)}
              />
            )}
            {f.type === "checkbox" && (
              <div className="space-y-2 pt-1">
                {f.checkboxOptions?.map((opt) => (
                  <div key={opt.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`${f.id}_${opt.id}`}
                      checked={(data[f.id] || []).includes(opt.id)}
                      onChange={() => toggleCheckbox(f.id, opt.id)}
                      className="h-4 w-4 accent-indigo-600"
                    />
                    <label htmlFor={`${f.id}_${opt.id}`} className="text-sm cursor-pointer text-black">
                      {opt.label}
                    </label>
                  </div>
                ))}
              </div>
            )}
            {f.type === "file" && (
              <>
                <input
                  type="file"
                  accept={f.acceptedFileTypes || undefined}
                  multiple={f.allowMultipleFiles}
                  onChange={(e) => {
                    const selected = e.target.files ? Array.from(e.target.files).map(file => file.name) : []
                    const currentFiles = Array.isArray(data[f.id]) ? data[f.id] : []
                    const nextFiles = f.allowMultipleFiles
                      ? Array.from(new Set([...currentFiles, ...selected]))
                      : selected
                    changeValue(f.id, nextFiles)
                  }}
                  className="mt-1 block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 cursor-pointer"
                />
                {Array.isArray(data[f.id]) && data[f.id].length > 0 && (
                  <p className="mt-2 text-sm text-gray-600">Selected files: {data[f.id].join(", ")}</p>
                )}
              </>
            )}
          </div>
        ))}
        <Button type="submit" className="w-full">Submit Answers</Button>
      </form>
      {output && (
        <div className="border rounded-xl p-4">
          <p className="font-bold mb-2 text-white">Form Data Output</p>
          <pre className="text-white text-xs font-mono">{output}</pre>
        </div>
      )}
    </div>
  )
}