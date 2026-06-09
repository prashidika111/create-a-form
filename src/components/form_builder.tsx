"use client"
import * as React from "react"
import {Button} from "@/src/components/ui/button"
import {Input} from "@/src/components/ui/input"
import {Label} from "@/src/components/ui/label"
import FieldEditor from "./field_editor"
import LivePreview from "./live_preview"
import {FormSchema, FormField} from "@/src/types"
interface FormBuilderProps 
{
  onBuildComplete: (schema: FormSchema) => void
}
export default function FormBuilder({ onBuildComplete }: FormBuilderProps) 
{
  const [title, setTitle] = React.useState("This is the title of your form")
  const [fields, setFields] = React.useState<FormField[]>([])
  const [selectedId, setSelectedId] = React.useState("")
  const [label, setLabel] = React.useState("")
  const [placeholder, setPlaceholder] = React.useState("")
  const [options, setOptions] = React.useState("")
  const [checkboxOptions, setCheckboxOptions] = React.useState("")
  const [fileTypes, setFileTypes] = React.useState("")
  const [multipleFiles, setMultipleFiles] = React.useState(false)
  const activeField = fields.find((f) => f.id === selectedId)
  React.useEffect(() => 
  {
    if (!activeField) return
    setLabel(activeField.label)
    setPlaceholder(activeField.placeholder || "")
    setOptions(activeField.options ? activeField.options.map(o => `${o.label}:${o.value}`).join(",") : "")
    setCheckboxOptions(activeField.checkboxOptions ? activeField.checkboxOptions.map(o => o.label).join(",") : "")
    setFileTypes(activeField.acceptedFileTypes || "")
    setMultipleFiles(activeField.allowMultipleFiles || false)
  }, [activeField])
  function addField(type: "text" | "select" | "checkbox" | "file") 
  {
    const id = `${type}_${Math.random().toString(36).substring(2, 9)}`
    const baseFields = {
      text: { label: "This is the title of the text field.", placeholder: "Write details..." },
      select: { label: "Select any one", options: [{ label: "Option 1", value: "1" }, { label: "Option 2", value: "2" }] },
      checkbox: { label: "Check all the boexs that apply", checkboxOptions: [{ id: "cb_opt_1", label: "Option A" }, { id: "cb_opt_2", label: "Option B" }] },
      file: { label: "Upload a file", acceptedFileTypes: "", allowMultipleFiles: false }
    }
    const newField: FormField = { id, type, ...baseFields[type] }
    setFields([...fields, newField])
    setSelectedId(id)
  }
  function removeField(id: string) 
  {
    setFields(fields.filter((f) => f.id !== id))
    if (selectedId === id) setSelectedId("")
  }
  function saveChanges() 
  {
    setFields(fields.map((f) => {
      if (f.id !== selectedId) return f
      const updated: FormField = { ...f, label, placeholder }
      if (f.type === "select") 
      {
        updated.options = options.split(",").map(b => 
        {
          const [lbl, val] = b.split(":")
          return lbl && val ? { label: lbl.trim(), value: val.trim() } : null
        }).filter(Boolean) as { label: string; value: string }[]
      }
      if (f.type === "checkbox") 
      {
        updated.checkboxOptions = checkboxOptions.split(",").map((str, i) => 
        {
          const trimmed = str.trim()
          return trimmed ? { id: `cb_opt_${i}`, label: trimmed } : null
        }).filter(Boolean) as { id: string; label: string }[]
      }
      if (f.type === "file") 
      {
        updated.acceptedFileTypes = fileTypes
        updated.allowMultipleFiles = multipleFiles
      }
      return updated
    }))
  }
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-6 rounded-xl border bg-card p-5">
          <div>
            <Label>Enter a title for the form</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="space-y-2 border-t pt-4">
            <Label className="text-sm font-bold">Add new fields</Label>
            <div className="grid grid-cols-2 gap-3">
              <Button onClick={() => addField("text")} variant="outline">+ Add a text field</Button>
              <Button onClick={() => addField("select")} variant="outline">+ Add select option field</Button>
              <Button onClick={() => addField("checkbox")} variant="outline">+ Add checkbox field</Button>
              <Button onClick={() => addField("file")} variant="outline">+ Add file upload field</Button>
            </div>
          </div>
          <FieldEditor
            activeField={activeField}
            label={label} setLabel={setLabel}
            placeholder={placeholder} setPlaceholder={setPlaceholder}
            options={options} setOptions={setOptions}
            checkboxOptions={checkboxOptions} setCheckboxOptions={setCheckboxOptions}
            fileTypes={fileTypes} setFileTypes={setFileTypes}
            multipleFiles={multipleFiles} setMultipleFiles={setMultipleFiles}
            onSave={saveChanges}
          />
        </div>
        <div className="space-y-4">
          <LivePreview
            title={title}
            fields={fields}
            selectedId={selectedId}
            onSelect={setSelectedId}
            onDelete={removeField}
          />
          <Button
            onClick={() => onBuildComplete({ title, fields })}
            className="w-full bg-indigo-600 py-6 text-md font-bold hover:bg-indigo-700"
          >
            Create Form
          </Button>
        </div>
      </div>
    </div>
  )
}