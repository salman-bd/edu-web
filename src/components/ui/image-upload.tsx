"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Upload, X } from "lucide-react"

interface AvatarUploadProps {
  value: File | null
  onChange: (file: File | null) => void
}

export function ImageUpload({ onChange }: AvatarUploadProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null

    if (file) {
      onChange(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemove = () => {
    onChange(null)
    setPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="flex flex-col items-center">
      {preview ? (
        <div className="relative w-32 h-32 mb-4">
          <Image
            src={preview || "/placeholder.svg"}
            alt="Avatar preview"
            fill
            className="rounded-full object-cover border-4 border-indigo-100"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute -top-2 -right-2 h-8 w-8 rounded-full"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Remove</span>
          </Button>
        </div>
      ) : (
        <div className="w-32 h-32 rounded-full bg-indigo-50 border-4 border-indigo-100 flex items-center justify-center mb-4">
          <Upload className="h-10 w-10 text-indigo-300" />
        </div>
      )}

      <Button
        type="button"
        variant="outline"
        onClick={() => fileInputRef.current?.click()}
        className="border-indigo-600 text-indigo-600 hover:bg-indigo-50"
      >
        {preview ? "Change Photo" : "Upload Photo"}
      </Button>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/jpeg,image/jpg,image/png,image/webp"
        className="hidden"
      />
    </div>
  )
}

