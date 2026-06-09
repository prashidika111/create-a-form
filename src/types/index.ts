export interface SelectOption 
{
  label: string;
  value: string;
}
export interface CheckboxOption 
{
  id: string;
  label: string;
}
export interface FormField 
{
  id: string;
  type: "text" | "select" | "checkbox" | "file";
  label: string;
  placeholder?: string;
  options?: SelectOption[];
  checkboxOptions?: CheckboxOption[];
  acceptedFileTypes?: string;
  allowMultipleFiles?: boolean;
}
export interface FormSchema 
{
  title: string;
  fields: FormField[];
}