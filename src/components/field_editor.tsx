"use client"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Button } from "@/src/components/ui/button"
import { FormField } from "@/src/types"
interface FieldEditorProps 
{
  activeField: FormField | undefined
  label: string
  setLabel: (v: string) => void
  placeholder: string
  setPlaceholder: (v: string) => void
  options: string
  setOptions: (v: string) => void
  checkboxOptions: string
  setCheckboxOptions: (v: string) => void
  fileTypes: string
  setFileTypes: (v: string) => void
  multipleFiles: boolean
  setMultipleFiles: (v: boolean) => void
  onSave: () => void
}
export default function FieldEditor({activeField, label, setLabel, placeholder, setPlaceholder, options, setOptions, checkboxOptions, setCheckboxOptions, fileTypes, setFileTypes, multipleFiles, setMultipleFiles, onSave,}: FieldEditorProps) 
{
  if (!activeField) 
  {
    return (
      <div className="border border-dashed p-4 rounded-lg text-center text-sm">
        Select a field from the preview to edit it.
      </div>
    )
  }
  return (
    <div className="border p-4 rounded-xl space-y-4">
      <h3 className="font-bold">Field Properties</h3>
      <div>
        <Label>Field Label</Label>
        <Input value={label} onChange={(e) => setLabel(e.target.value)} />
      </div>
      {activeField.type === "text" && (
        <div>
          <Label>Placeholder</Label>
          <Input value={placeholder} onChange={(e) => setPlaceholder(e.target.value)} />
        </div>
      )}
      {activeField.type === "select" && (
        <div>
          <Label>Options</Label>
          <Input
            value={options}
            onChange={(e) => setOptions(e.target.value)}
            placeholder="Option 1:1, Option 2:2"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Format: <code>Label:value, Label:value</code>
          </p>
        </div>
      )}
      {activeField.type === "checkbox" && (
        <div>
          <Label>Checkbox Options</Label>
          <Input
            className="text-black"
            value={checkboxOptions}
            onChange={(e) => setCheckboxOptions(e.target.value)}
            placeholder="Option A, Option B, Option C"
          />
        </div>
      )}
      {activeField.type === "file" && (
        <div className="space-y-3">
          <div>
            <Label>Accepted File Types</Label>
            <Input
              value={fileTypes}
              onChange={(e) => setFileTypes(e.target.value)}
              placeholder=".pdf,.png,.jpg  (if any type is allowed, leave blank)"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              id="allow-multiple"
              type="checkbox"
              checked={multipleFiles}
              onChange={(e) => setMultipleFiles(e.target.checked)}
              className="h-4 w-4 accent-indigo-600"
            />
            <Label htmlFor="allow-multiple" className="cursor-pointer">
              Allow multiple files
            </Label>
          </div>
        </div>
      )}
      <Button onClick={onSave} className="w-full">
        Save Changes
      </Button>
    </div>
  )
}