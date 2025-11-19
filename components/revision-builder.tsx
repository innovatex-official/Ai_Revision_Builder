'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { parseFile } from '@/lib/file-parser'
import { RevisionResult } from '@/lib/types'
import FileUpload from './file-upload'
import RevisionResults from './revision-results'
import { Loader2 } from 'lucide-react'

export default function RevisionBuilder() {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<RevisionResult | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile)
  }

  const handleGenerate = async () => {
    if (!file) {
      toast({
        title: 'No file selected',
        description: 'Please upload a file first',
        variant: 'destructive',
      })
      return
    }

    setLoading(true)
    try {
      const content = await parseFile(file)
      
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          fileName: file.name,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate revision material')
      }

      const data = await response.json()
      setResults(data)
      
      toast({
        title: 'Success!',
        description: 'Revision material generated successfully',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'An error occurred',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground py-8">
      <div className="container-wide">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">AI Revision Builder</h1>
          <p className="text-foreground/70">Upload your study material and let AI generate comprehensive revision content</p>
        </div>

        {!results ? (
          <Card className="p-8">
            <FileUpload onFileSelect={handleFileSelect} selectedFile={file} />
            
            {file && (
              <div className="mt-8 flex gap-4">
                <Button
                  onClick={handleGenerate}
                  disabled={loading}
                  size="lg"
                  className="gap-2"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {loading ? 'Generating...' : 'Generate Revision Material'}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setFile(null)
                    setResults(null)
                  }}
                >
                  Clear
                </Button>
              </div>
            )}
          </Card>
        ) : (
          <div className="space-y-4">
            <Button
              variant="outline"
              onClick={() => {
                setFile(null)
                setResults(null)
              }}
            >
              ← Generate New Revision
            </Button>
            <RevisionResults results={results} sourceFileName={file?.name} />
          </div>
        )}
      </div>
    </div>
  )
}
