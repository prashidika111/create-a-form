"use client"
import * as React from "react"
import {Input} from "@/src/components/ui/input"
import {Label} from "@/src/components/ui/label"
import {Button} from "@/src/components/ui/button"
import {Select} from "@/src/components/ui/select"
import {FormField} from "@/src/types"
interface LivePreviewProps 
{
  title: string
  fields: FormField[]
  selectedId: string
  onSelect: (id: string) => void
  onDelete: (id: string) => void
}
export default function LivePreview({ title, fields, selectedId, onSelect, onDelete }: LivePreviewProps) 
{
  return (
    <div className="bg-background p-6 rounded-xl border shadow-sm space-y-4">
      <h1 className="text-2xl font-black border-b pb-2">{title}</h1>
      {fields.length === 0 && (
        <p className="text-muted-foreground text-sm italic">Your form is empty. Add fields to begin.</p>
      )}
      {fields.map((f) => {
        const active = f.id === selectedId
        return (
          <div
            key={f.id}
            onClick={() => onSelect(f.id)}
            className={`p-4 rounded-lg border cursor-pointer relative group transition-all ${
              active ? "border-primary ring-2 ring-primary/20 bg-primary/5" : "border-dashed hover:bg-muted/50"
            }`}
          >
            <Button
              variant="destructive"
              size="sm"
              className="absolute right-2 top-2 h-7 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => { e.stopPropagation(); onDelete(f.id) }}
            >
              Remove
            </Button>
            <Label className="font-semibold mb-1.5 block">{f.label}</Label>
            {f.type === "text" && (
              <Input disabled placeholder={f.placeholder || "Enter text here..."} />
            )}
            {f.type === "select" && (
              <Select disabled value="" placeholder="Select choice..." options={f.options} onChange={() => {}} />
            )}
            {f.type === "checkbox" && (
              <div className="space-y-1.5 pt-1">
                {f.checkboxOptions?.map((opt) => (
                  <div key={opt.id} className="flex items-center gap-2">
                    <input type="checkbox" disabled id={`prev_${opt.id}`} className="h-4 w-4 accent-indigo-600" />
                    <label htmlFor={`prev_${opt.id}`} className="text-sm text-muted-foreground">
                      {opt.label}
                    </label>
                  </div>
                ))}
              </div>
            )}
            {f.type === "file" && (
              <div className="mt-1 flex items-center gap-3 rounded-md border border-dashed px-4 py-3 text-sm text-muted-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-8m0 0-3 3m3-3 3 3M6.5 20h11A2.5 2.5 0 0 0 20 17.5v-7A2.5 2.5 0 0 0 17.5 8H16l-2-3H10L8 8H6.5A2.5 2.5 0 0 0 4 10.5v7A2.5 2.5 0 0 0 6.5 20z" />
                </svg>
                <span>
                  {f.allowMultipleFiles ? "Upload files" : "Upload a file"}
                  {f.acceptedFileTypes ? ` (${f.acceptedFileTypes})` : " (any format)"}
                </span>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}