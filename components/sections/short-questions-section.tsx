'use client'

import { ShortQuestion } from '@/lib/types'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Copy } from 'lucide-react'
import { useState } from 'react'

interface ShortQuestionsSectionProps {
  questions: ShortQuestion[]
}

export default function ShortQuestionsSection({ questions }: ShortQuestionsSectionProps) {
  const [expandedAnswers, setExpandedAnswers] = useState<Record<number, boolean>>({})

  const toggleAnswer = (index: number) => {
    setExpandedAnswers((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  const copyQuestion = async (question: string) => {
    await navigator.clipboard.writeText(question)
  }

  return (
    <div className="space-y-4">
      {questions.map((q, index) => (
        <Card key={index} className="p-4">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-semibold flex-1">
              {index + 1}. {q.question}
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyQuestion(q.question)}
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>

          <button
            onClick={() => toggleAnswer(index)}
            className="text-primary hover:underline text-sm font-medium"
          >
            {expandedAnswers[index] ? 'Hide' : 'Show'} Answer
          </button>

          {expandedAnswers[index] && (
            <div className="mt-3 border-t border-foreground/10 pt-3">
              <p className="text-sm">{q.answer}</p>
            </div>
          )}
        </Card>
      ))}
    </div>
  )
}
