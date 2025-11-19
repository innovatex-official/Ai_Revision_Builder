'use client'

import { RevisionResult } from '@/lib/types'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import MCQSection from './sections/mcq-section'
import TrueFalseSection from './sections/true-false-section'
import ShortQuestionsSection from './sections/short-questions-section'
import LongQuestionsSection from './sections/long-questions-section'
import SummarySection from './sections/summary-section'
import KeywordsSection from './sections/keywords-section'
import FlashcardsSection from './sections/flashcards-section'
import { Download, Copy, ChevronDown, ChevronUp, Loader2 } from 'lucide-react'
import { generateRevisionPDF } from '@/lib/pdf-export'

interface RevisionResultsProps {
  results: RevisionResult
  sourceFileName?: string
}

export default function RevisionResults({ results, sourceFileName = 'revision' }: RevisionResultsProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    mcq: true,
    tf: true,
    short: true,
    long: true,
    summary: true,
    keywords: true,
    flashcards: true,
  })
  const [exportingPDF, setExportingPDF] = useState(false)

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const handleCopyAll = async () => {
    const text = `
InnovateX - Revision Material

SUMMARY:
${results.summary}

KEY TERMS:
${results.keywords.join(', ')}

MCQs:
${results.mcqs.map((q) => `Q: ${q.question}\nOptions: ${q.options.join(', ')}\nAnswer: ${q.answer}\n${q.explanation}`).join('\n\n')}

TRUE/FALSE:
${results.truefalse.map((q) => `Statement: ${q.statement}\nAnswer: ${q.answer}\n${q.explanation}`).join('\n\n')}

SHORT QUESTIONS:
${results.shortquestions.map((q) => `Q: ${q.question}\nA: ${q.answer}`).join('\n\n')}

LONG QUESTIONS:
${results.longquestions.map((q) => `Q: ${q.question}\nA: ${q.answer}`).join('\n\n')}

FLASHCARDS:
${results.flashcards.map((f) => `Q: ${f.question}\nA: ${f.answer}`).join('\n\n')}
    `.trim()
    
    await navigator.clipboard.writeText(text)
  }

  const handleExportPDF = async () => {
    setExportingPDF(true)
    try {
      await generateRevisionPDF(results, sourceFileName)
    } catch (error) {
      console.error('PDF export error:', error)
    } finally {
      setExportingPDF(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-4 flex-wrap">
        <Button onClick={handleCopyAll} variant="outline" className="gap-2">
          <Copy className="w-4 h-4" />
          Copy All
        </Button>
        <Button 
          onClick={handleExportPDF} 
          disabled={exportingPDF}
          variant="outline" 
          className="gap-2"
        >
          {exportingPDF ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Exporting...
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              Export as PDF
            </>
          )}
        </Button>
      </div>

      <div className="space-y-4">
        <CollapsibleSection
          title="Summary"
          id="summary"
          expanded={expandedSections.summary}
          onToggle={toggleSection}
        >
          <SummarySection summary={results.summary} />
        </CollapsibleSection>

        <CollapsibleSection
          title={`Keywords (${results.keywords.length})`}
          id="keywords"
          expanded={expandedSections.keywords}
          onToggle={toggleSection}
        >
          <KeywordsSection keywords={results.keywords} />
        </CollapsibleSection>

        <CollapsibleSection
          title={`Multiple Choice Questions (${results.mcqs.length})`}
          id="mcq"
          expanded={expandedSections.mcq}
          onToggle={toggleSection}
        >
          <MCQSection mcqs={results.mcqs} />
        </CollapsibleSection>

        <CollapsibleSection
          title={`True/False Questions (${results.truefalse.length})`}
          id="tf"
          expanded={expandedSections.tf}
          onToggle={toggleSection}
        >
          <TrueFalseSection questions={results.truefalse} />
        </CollapsibleSection>

        <CollapsibleSection
          title={`Short Questions (${results.shortquestions.length})`}
          id="short"
          expanded={expandedSections.short}
          onToggle={toggleSection}
        >
          <ShortQuestionsSection questions={results.shortquestions} />
        </CollapsibleSection>

        <CollapsibleSection
          title={`Long Questions (${results.longquestions.length})`}
          id="long"
          expanded={expandedSections.long}
          onToggle={toggleSection}
        >
          <LongQuestionsSection questions={results.longquestions} />
        </CollapsibleSection>

        <CollapsibleSection
          title={`Flashcards (${results.flashcards.length})`}
          id="flashcards"
          expanded={expandedSections.flashcards}
          onToggle={toggleSection}
        >
          <FlashcardsSection flashcards={results.flashcards} />
        </CollapsibleSection>
      </div>
    </div>
  )
}

function CollapsibleSection({
  title,
  id,
  expanded,
  onToggle,
  children,
}: {
  title: string
  id: string
  expanded: boolean
  onToggle: (id: string) => void
  children: React.ReactNode
}) {
  return (
    <Card className="overflow-hidden">
      <button
        onClick={() => onToggle(id)}
        className="w-full p-6 flex items-center justify-between hover:bg-card/50 transition"
      >
        <h2 className="text-xl font-semibold">{title}</h2>
        {expanded ? (
          <ChevronUp className="w-5 h-5" />
        ) : (
          <ChevronDown className="w-5 h-5" />
        )}
      </button>
      {expanded && <div className="border-t border-foreground/10 p-6">{children}</div>}
    </Card>
  )
}
