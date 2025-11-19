'use client'

import { MCQ } from '@/lib/types'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Copy } from 'lucide-react'
import { useState } from 'react'

interface MCQSectionProps {
  mcqs: MCQ[]
}

export default function MCQSection({ mcqs }: MCQSectionProps) {
  const [expandedAnswers, setExpandedAnswers] = useState<Record<number, boolean>>({})

  const toggleAnswer = (index: number) => {
    setExpandedAnswers((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  const copyQuestion = async (question: MCQ) => {
    const text = `Q: ${question.question}\n${question.options
      .map((opt, i) => `${String.fromCharCode(65 + i)}) ${opt}`)
      .join('\n')}`
    await navigator.clipboard.writeText(text)
  }

  return (
    <div className="space-y-4">
      {mcqs.map((mcq, index) => (
        <Card key={index} className="p-4">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-semibold flex-1">
              {index + 1}. {mcq.question}
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyQuestion(mcq)}
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-2 mb-4">
            {mcq.options.map((option, optIndex) => (
              <div key={optIndex} className="p-2 rounded bg-card/50">
                {String.fromCharCode(65 + optIndex)}) {option}
              </div>
            ))}
          </div>

          <button
            onClick={() => toggleAnswer(index)}
            className="text-primary hover:underline text-sm font-medium"
          >
            {expandedAnswers[index] ? 'Hide' : 'Show'} Answer
          </button>

          {expandedAnswers[index] && (
            <div className="mt-3 space-y-2 border-t border-foreground/10 pt-3">
              <p className="text-sm">
                <strong>Correct Answer:</strong> {mcq.answer}
              </p>
              <p className="text-sm text-foreground/70">{mcq.explanation}</p>
            </div>
          )}
        </Card>
      ))}
    </div>
  )
}
