export interface RevisionResult {
  mcqs: MCQ[]
  truefalse: TrueFalse[]
  shortquestions: ShortQuestion[]
  longquestions: LongQuestion[]
  summary: string
  keywords: string[]
  flashcards: Flashcard[]
}

export interface MCQ {
  question: string
  options: string[]
  answer: string
  explanation: string
}

export interface TrueFalse {
  statement: string
  answer: boolean
  explanation: string
}

export interface ShortQuestion {
  question: string
  answer: string
}

export interface LongQuestion {
  question: string
  answer: string
}

export interface Flashcard {
  question: string
  answer: string
}
