'use client'

import React, { useState, useRef } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { User } from 'lucide-react'

interface AvatarUploadProps {
  onChange: (file: File | null) => void
  value: File | null
}

export function AvatarUpload({ onChange, value }: AvatarUploadProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
      onChange(file)
    } else {
      setPreview(null)
      onChange(null)
    }
  }

  const handleRemove = () => {
    setPreview(null)
    onChange(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <Avatar className="w-32 h-32">
        {preview ? (
          <AvatarImage src={preview} alt="Avatar preview" />
        ) : (
          <AvatarFallback>
            <User className="w-16 h-16 text-muted-foreground" />
          </AvatarFallback>
        )}
      </Avatar>
      <div className="flex space-x-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
        >
          {value ? 'Change Avatar' : 'Upload Avatar'}
        </Button>
        {value && (
          <Button
            type="button"
            variant="destructive"
            onClick={handleRemove}
          >
            Remove
          </Button>
        )}
      </div>
      <Label htmlFor="avatar-upload" className="sr-only">
        Upload avatar
      </Label>
      <Input
        id="avatar-upload"
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
        aria-hidden="true"
      />
      {value && (
        <p className="text-sm text-muted-foreground">
          {value.name} ({(value.size / 1024 / 1024).toFixed(2)} MB)
        </p>
      )}
    </div>
  )
}

