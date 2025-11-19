import { Button } from '@/components/ui/button'
import { Copy } from 'lucide-react'

interface SummarySectionProps {
  summary: string
}

export default function SummarySection({ summary }: SummarySectionProps) {
  const copySummary = async () => {
    await navigator.clipboard.writeText(summary)
  }

  return (
    <div className="space-y-4">
      <Button onClick={copySummary} variant="outline" size="sm" className="gap-2">
        <Copy className="w-4 h-4" />
        Copy Summary
      </Button>
      <div className="prose prose-invert max-w-none text-foreground">
        <p className="whitespace-pre-wrap text-foreground/90 leading-relaxed">{summary}</p>
      </div>
    </div>
  )
}
