import jsPDF from 'jspdf'
import { RevisionResult } from './types'

export async function generateRevisionPDF(
  results: RevisionResult,
  fileName: string
): Promise<void> {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  })

  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 15
  const contentWidth = pageWidth - 2 * margin
  let yPosition = margin

  // Helper functions
  const addText = (text: string, fontSize: number = 12, isBold: boolean = false) => {
    if (isBold) {
      doc.setFont('Helvetica', 'bold')
    } else {
      doc.setFont('Helvetica', 'normal')
    }
    doc.setFontSize(fontSize)
    const lines = doc.splitTextToSize(text, contentWidth)
    doc.text(lines, margin, yPosition)
    yPosition += (lines.length * fontSize) / 3 + 3
  }

  const addHeading = (text: string, level: 1 | 2 = 1) => {
    checkPageBreak(12)
    addText(text, level === 1 ? 18 : 14, true)
    yPosition += 2
  }

  const checkPageBreak = (space: number) => {
    if (yPosition + space > pageHeight - margin) {
      doc.addPage()
      yPosition = margin
    }
  }

  // Title Page
  addHeading('InnovateX', 1)
  addText('AI Revision Builder', 12)
  addText(`Source: ${fileName}`, 10)
  addText(`Generated: ${new Date().toLocaleDateString()}`, 10)
  yPosition += 10

  // Summary Section
  checkPageBreak(20)
  addHeading('Summary', 1)
  addText(results.summary, 10)
  yPosition += 5

  // Keywords Section
  checkPageBreak(15)
  addHeading('Key Terms & Keywords', 1)
  const keywordText = results.keywords.join(', ')
  addText(keywordText, 10)
  yPosition += 5

  // MCQs Section
  checkPageBreak(20)
  addHeading('Multiple Choice Questions', 1)
  results.mcqs.forEach((mcq, index) => {
    checkPageBreak(15)
    addText(`Q${index + 1}: ${mcq.question}`, 11, true)
    mcq.options.forEach((option, optIndex) => {
      const optionLetter = String.fromCharCode(65 + optIndex)
      addText(`${optionLetter}) ${option}`, 10)
    })
    addText(`Answer: ${mcq.answer}`, 10, true)
    addText(`Explanation: ${mcq.explanation}`, 9)
    yPosition += 3
  })

  // True/False Section
  checkPageBreak(20)
  addHeading('True/False Questions', 1)
  results.truefalse.forEach((tf, index) => {
    checkPageBreak(10)
    addText(`Q${index + 1}: ${tf.statement}`, 11, true)
    addText(`Answer: ${tf.answer ? 'TRUE' : 'FALSE'}`, 10, true)
    addText(`Explanation: ${tf.explanation}`, 9)
    yPosition += 3
  })

  // Short Questions Section
  checkPageBreak(20)
  addHeading('Short Answer Questions', 1)
  results.shortquestions.forEach((sq, index) => {
    checkPageBreak(10)
    addText(`Q${index + 1}: ${sq.question}`, 11, true)
    addText(`Answer: ${sq.answer}`, 10)
    yPosition += 3
  })

  // Long Questions Section
  checkPageBreak(20)
  addHeading('Long Answer Questions', 1)
  results.longquestions.forEach((lq, index) => {
    checkPageBreak(15)
    addText(`Q${index + 1}: ${lq.question}`, 11, true)
    addText(lq.answer, 10)
    yPosition += 5
  })

  // Flashcards Summary
  checkPageBreak(20)
  addHeading('Flashcards', 1)
  results.flashcards.forEach((fc, index) => {
    checkPageBreak(8)
    addText(`Card ${index + 1}:`, 11, true)
    addText(`Q: ${fc.question}`, 10)
    addText(`A: ${fc.answer}`, 10)
    yPosition += 2
  })

  // Footer
  const totalPages = (doc as any).internal.pages.length - 1
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i)
    doc.setFontSize(9)
    doc.setTextColor(128, 128, 128)
    doc.text(
      `Page ${i} of ${totalPages}`,
      pageWidth / 2,
      pageHeight - 10,
      { align: 'center' }
    )
  }

  // Download
  const fileName_sanitized = fileName.replace(/\.[^/.]+$/, '')
  doc.save(`${fileName_sanitized}-revision.pdf`)
}
