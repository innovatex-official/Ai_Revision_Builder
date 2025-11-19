'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, Zap, FileText, Brain } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-card">
        <div className="container-wide py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold text-primary">InnovateX</span>
          </div>
          <Link href="/builder">
            <Button>Get Started</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container-wide py-20 md:py-32">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            Upload. Analyze.<br />
            <span className="gradient-primary bg-clip-text text-transparent">Revise Smarter.</span>
          </h1>
          <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto text-balance">
            Transform your study materials into comprehensive revision content powered by AI. Upload PDFs, videos, audio, or text—instantly get MCQs, flashcards, summaries, and more.
          </p>
          <Link href="/builder">
            <Button size="lg" className="gap-2">
              Start Revising <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="p-6 rounded-lg bg-card border border-foreground/10">
            <FileText className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Multiple Formats</h3>
            <p className="text-foreground/70">
              Support for PDFs, text, audio, video, and images. One upload, infinite possibilities.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-card border border-foreground/10">
            <Brain className="w-8 h-8 text-accent mb-4" />
            <h3 className="text-xl font-semibold mb-2">AI-Powered Analysis</h3>
            <p className="text-foreground/70">
              Advanced AI extracts key concepts and generates diverse question types automatically.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-card border border-foreground/10">
            <Zap className="w-8 h-8 text-success mb-4" />
            <h3 className="text-xl font-semibold mb-2">Instant Results</h3>
            <p className="text-foreground/70">
              Get MCQs, flashcards, summaries, and more in seconds. Study smarter, not harder.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-card border-t border-foreground/10">
        <div className="container-wide py-16 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to transform your study routine?</h2>
          <Link href="/builder">
            <Button size="lg" className="gap-2">
              Start Now <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-card">
        <div className="container-wide py-8 text-center text-foreground/60">
          <p>&copy; 2025 InnovateX. Powered by AI. Built for students.</p>
        </div>
      </footer>
    </div>
  )
}
