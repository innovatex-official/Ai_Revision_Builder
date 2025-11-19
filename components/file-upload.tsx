'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Upload, X } from 'lucide-react'

interface FileUploadProps {
  onFileSelect: (file: File) => void
  selectedFile: File | null
}

export default function FileUpload({ onFileSelect, selectedFile }: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false)

  const supportedFormats = ['.pdf', '.txt', '.mp3', '.wav', '.mp4', '.mov', '.png', '.jpg', '.jpeg']

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0])
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0])
    }
  }

  return (
    <div>
      {!selectedFile ? (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition ${
            dragActive
              ? 'border-primary bg-primary/5'
              : 'border-foreground/20 hover:border-primary/50'
          }`}
        >
          <Upload className="w-12 h-12 mx-auto mb-4 text-foreground/50" />
          <h3 className="text-xl font-semibold mb-2">Drag and drop your file</h3>
          <p className="text-foreground/70 mb-4">Or click to browse your computer</p>
          <div className="flex flex-wrap gap-2 justify-center mb-4">
            {supportedFormats.map((format) => (
              <span key={format} className="px-3 py-1 bg-card rounded text-sm">
                {format}
              </span>
            ))}
          </div>
          <input
            type="file"
            onChange={handleFileInput}
            className="hidden"
            id="file-input"
            accept={supportedFormats.join(',')}
          />
          <label htmlFor="file-input">
            <Button as="span" className="cursor-pointer">
              Browse Files
            </Button>
          </label>
        </div>
      ) : (
        <div className="bg-card rounded-lg p-6 flex items-center justify-between">
          <div>
            <p className="font-semibold">{selectedFile.name}</p>
            <p className="text-sm text-foreground/60">
              {(selectedFile.size / 1024).toFixed(2)} KB
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onFileSelect(null as any)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
