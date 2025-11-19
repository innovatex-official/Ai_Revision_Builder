import { Button } from '@/components/ui/button'
import { Copy } from 'lucide-react'

interface KeywordsSectionProps {
  keywords: string[]
}

export default function KeywordsSection({ keywords }: KeywordsSectionProps) {
  const copyKeywords = async () => {
    await navigator.clipboard.writeText(keywords.join(', '))
  }

  return (
    <div className="space-y-4">
      <Button onClick={copyKeywords} variant="outline" size="sm" className="gap-2">
        <Copy className="w-4 h-4" />
        Copy Keywords
      </Button>
      <div className="flex flex-wrap gap-2">
        {keywords.map((keyword, index) => (
          <span
            key={index}
            className="px-3 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20"
          >
            {keyword}
          </span>
        ))}
      </div>
    </div>
  )
}
