import { NextRequest, NextResponse } from 'next/server'

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY
const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1'

export async function POST(request: NextRequest) {
  try {
    const { content, fileName } = await request.json()

    if (!content || !fileName) {
      return NextResponse.json(
        { error: 'Missing content or fileName' },
        { status: 400 }
      )
    }

    if (!OPENROUTER_API_KEY) {
      return NextResponse.json(
        { error: 'OpenRouter API key not configured' },
        { status: 500 }
      )
    }

    const prompt = generateRevisionPrompt(content, fileName)

    const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
        'X-Title': 'InnovateX',
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o-mini',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 4000,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('OpenRouter error:', error)
      return NextResponse.json(
        { error: 'Failed to generate revision material' },
        { status: 500 }
      )
    }

    const data = await response.json()
    const result = parseRevisionResponse(data.choices[0].message.content)

    return NextResponse.json(result)
  } catch (error) {
    console.error('Generation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

function generateRevisionPrompt(content: string, fileName: string): string {
  return `Based on the following study material from "${fileName}", generate comprehensive revision content in JSON format:

${content}

Return a JSON object with these exact keys:
{
  "mcqs": [
    {
      "question": "question text",
      "options": ["A", "B", "C", "D"],
      "answer": "A",
      "explanation": "explanation"
    }
  ],
  "truefalse": [
    {
      "statement": "statement",
      "answer": true,
      "explanation": "explanation"
    }
  ],
  "shortquestions": [
    {
      "question": "question",
      "answer": "answer"
    }
  ],
  "longquestions": [
    {
      "question": "question",
      "answer": "detailed answer"
    }
  ],
  "summary": "2-3 paragraph summary",
  "keywords": ["keyword1", "keyword2", ...],
  "flashcards": [
    {
      "question": "term or concept",
      "answer": "definition or explanation"
    }
  ]
}

Generate exactly 10 MCQs, 5 True/False questions, 5 Short questions, 3 Long questions, and 10 flashcards. Ensure the summary is comprehensive and keywords are the most important concepts.`
}

function parseRevisionResponse(response: string) {
  try {
    const jsonMatch = response.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('No JSON found in response')
    }
    return JSON.parse(jsonMatch[0])
  } catch (error) {
    console.error('Parse error:', error)
    return {
      mcqs: [],
      truefalse: [],
      shortquestions: [],
      longquestions: [],
      summary: 'Error processing response',
      keywords: [],
      flashcards: [],
    }
  }
}
