import * as React from "react"
export function Input({ className = "", type = "text", ...props }: React.InputHTMLAttributes<HTMLInputElement>) 
{
  return (
    <input
      type={type}
      className={`flex h-10 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:focus-visible:ring-zinc-300 ${className}`}
      {...props}
    />
  )
}