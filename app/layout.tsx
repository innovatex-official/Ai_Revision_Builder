import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'InnovateX - AI Revision Builder',
  description: 'Upload. Analyze. Revise Smarter. Generate comprehensive revision materials from your study content.',
  keywords: 'revision, study, AI, learning, MCQ, flashcards',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#1f2937" />
      </head>
      <body className={`${geist.className} bg-background text-foreground`}>
        {children}
      </body>
    </html>
  )
}
