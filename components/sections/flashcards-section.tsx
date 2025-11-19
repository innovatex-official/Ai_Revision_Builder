'use client'

import { Flashcard } from '@/lib/types'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Copy, RotateCw } from 'lucide-react'
import { useState } from 'react'

interface FlashcardsSectionProps {
  flashcards: Flashcard[]
}

export default function FlashcardsSection({ flashcards }: FlashcardsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)

  const current = flashcards[currentIndex]

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % flashcards.length)
    setIsFlipped(false)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length)
    setIsFlipped(false)
  }

  const copyFlashcard = async () => {
    await navigator.clipboard.writeText(
      `Q: ${current.question}\nA: ${current.answer}`
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-foreground/60">
          Card {currentIndex + 1} of {flashcards.length}
        </div>
        <Button onClick={copyFlashcard} variant="outline" size="sm" className="gap-2">
          <Copy className="w-4 h-4" />
          Copy
        </Button>
      </div>

      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="relative h-64 cursor-pointer perspective"
      >
        <div
          className={`absolute w-full h-full bg-gradient-primary rounded-lg p-8 flex items-center justify-center text-center transition-all duration-500 ${
            isFlipped ? 'opacity-0 pointer-events-none' : ''
          }`}
        >
          <p className="text-xl font-semibold text-white">{current.question}</p>
        </div>

        <div
          className={`absolute w-full h-full bg-accent rounded-lg p-8 flex items-center justify-center text-center transition-all duration-500 ${
            isFlipped ? '' : 'opacity-0 pointer-events-none'
          }`}
        >
          <p className="text-xl font-semibold text-white">{current.answer}</p>
        </div>
      </div>

      <p className="text-center text-sm text-foreground/60">Click card to flip</p>

      <div className="flex gap-4 justify-center">
        <Button variant="outline" onClick={handlePrev}>
          ← Previous
        </Button>
        <Button onClick={() => setIsFlipped(!isFlipped)} variant="outline" className="gap-2">
          <RotateCw className="w-4 h-4" />
          Flip
        </Button>
        <Button variant="outline" onClick={handleNext}>
          Next →
        </Button>
      </div>
    </div>
  )
}
