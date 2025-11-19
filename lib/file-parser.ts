export async function parseFile(
  file: File
): Promise<string> {
  const extension = file.name.split('.').pop()?.toLowerCase()

  switch (extension) {
    case 'txt':
      return parseText(file)
    case 'pdf':
      return parsePDF(file)
    case 'mp3':
    case 'wav':
    case 'mp4':
    case 'mov':
      return parseAudio(file)
    case 'png':
    case 'jpg':
    case 'jpeg':
      return parseImage(file)
    default:
      throw new Error(`Unsupported file type: ${extension}`)
  }
}

async function parseText(file: File): Promise<string> {
  return await file.text()
}

async function parsePDF(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer()
  const { getDocument } = await import('pdfjs-dist')

  const pdf = await getDocument({ data: arrayBuffer }).promise
  let text = ''

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i)
    const textContent = await page.getTextContent()
    text += textContent.items.map((item: any) => item.str).join(' ') + '\n'
  }

  return text
}

async function parseAudio(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer()
  
  // For video files, we'd need ffmpeg to extract audio first
  // For now, we'll send to Whisper API
  const base64Audio = Buffer.from(arrayBuffer).toString('base64')
  
  const response = await fetch('/api/transcribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      audio: base64Audio,
      fileName: file.name,
    }),
  })

  const data = await response.json()
  if (!response.ok) throw new Error(data.error)
  
  return data.transcription
}

async function parseImage(file: File): Promise<string> {
  // For basic implementation, return a placeholder
  // In production, you'd use OCR via API
  return `[Image: ${file.name}]\nOCR processing would extract text from this image.`
}
