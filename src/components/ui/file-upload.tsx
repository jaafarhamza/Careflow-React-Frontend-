import * as React from 'react'
import { Upload, X, File } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export interface FileUploadProps {
  value?: File[]
  onChange?: (files: File[]) => void
  accept?: string
  multiple?: boolean
  maxSize?: number // in bytes
  maxFiles?: number
  disabled?: boolean
  error?: boolean
  helperText?: string
  className?: string
}

export function FileUpload({
  value = [],
  onChange,
  accept,
  multiple = false,
  maxSize,
  maxFiles,
  disabled,
  error,
  helperText,
  className,
}: FileUploadProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [errorMessage, setErrorMessage] = React.useState<string>('')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setErrorMessage('')

    // Validate file count
    if (maxFiles && files.length > maxFiles) {
      setErrorMessage(`Maximum ${maxFiles} files allowed`)
      return
    }

    // Validate file size
    if (maxSize) {
      const oversizedFile = files.find((file) => file.size > maxSize)
      if (oversizedFile) {
        setErrorMessage(
          `File ${oversizedFile.name} exceeds maximum size of ${formatFileSize(
            maxSize
          )}`
        )
        return
      }
    }

    onChange?.(files)
  }

  const handleRemoveFile = (index: number) => {
    const newFiles = value.filter((_, i) => i !== index)
    onChange?.(newFiles)
  }

  const handleClick = () => {
    inputRef.current?.click()
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
  }

  return (
    <div className={cn('w-full', className)}>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileChange}
        disabled={disabled}
        className="hidden"
      />

      <div
        className={cn(
          'border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors',
          error || errorMessage
            ? 'border-destructive bg-destructive/5'
            : 'border-border hover:border-primary',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
        onClick={!disabled ? handleClick : undefined}
      >
        <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <p className="text-sm font-medium mb-1">
          Click to upload or drag and drop
        </p>
        <p className="text-xs text-muted-foreground">
          {accept || 'Any file type'}
          {maxSize && ` (Max size: ${formatFileSize(maxSize)})`}
        </p>
      </div>

      {(helperText || errorMessage) && (
        <p
          className={cn(
            'mt-2 text-sm',
            error || errorMessage ? 'text-destructive' : 'text-muted-foreground'
          )}
        >
          {errorMessage || helperText}
        </p>
      )}

      {value.length > 0 && (
        <div className="mt-4 space-y-2">
          {value.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-muted rounded-lg"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <File className="h-4 w-4 text-muted-foreground shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={() => handleRemoveFile(index)}
                disabled={disabled}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
