"use client"

import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldContent,
} from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"

interface ImageInputProps {
  children?: React.ReactNode
  className?: string
  onFileChange: (file: File | null) => void
  label: React.ReactNode
  description: React.ReactNode
}

export function ImageInput({
  children,
  className,
  onFileChange,
  label,
  description,
}: ImageInputProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null

    onFileChange?.(file)
  }

  return (
    <Field className={className ?? ""}>
      <FieldLabel>{label}</FieldLabel>
      <Input type="file" accept="image/*" onChange={handleFileChange}></Input>
      <FieldDescription>{description}</FieldDescription>
      {children && <FieldContent>{children}</FieldContent>}
    </Field>
  )
}
