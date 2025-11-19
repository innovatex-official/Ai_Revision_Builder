# InnovateX - AI Revision Builder

Transform your study materials into comprehensive revision content powered by AI.

## Features

- **Multi-Format Support**: Upload PDFs, text files, audio, video, and images
- **AI-Powered Analysis**: Extract key concepts and generate diverse question types
- **Instant Results**: Get MCQs, flashcards, summaries, and more in seconds
- **Beautiful UI**: Modern, responsive design with dark mode support
- **Easy Sharing**: Copy, download, and export your revision materials

### Generated Content
- 10 Multiple Choice Questions (MCQs)
- 5 True/False Questions
- 5 Short Answer Questions
- 3 Long Answer Questions
- Comprehensive Summary
- Key Terms & Keywords
- Interactive Flashcards

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS, ShadCN UI
- **Backend**: Next.js API Routes
- **AI**: OpenRouter (supports gpt-4o-mini and other models)
- **File Processing**: 
  - PDF: pdf.js
  - Audio/Video: ffmpeg.wasm
  - Text: Native JavaScript
  - Images: OCR-ready structure

## Setup & Installation

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation Steps

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/innovatex-official/Ai_Revision_Builder.git
   cd Ai_Revision_Builder
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Add Environment Variables**
   
   Create a `.env.local` file in the root directory:
   \`\`\`env
   OPENROUTER_API_KEY=your_openrouter_api_key_here
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   \`\`\`

4. **Run Development Server**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Open in Browser**
   Navigate to `http://localhost:3000`

## Getting Your OpenRouter API Key

1. Visit [OpenRouter.ai](https://openrouter.ai)
2. Sign up for a free account
3. Go to your dashboard and copy your API key
4. Add it to your `.env.local` file

## Usage

1. **Upload Your Content**
   - Drag and drop or click to upload
   - Supports: PDF, TXT, MP3, WAV, MP4, MOV, PNG, JPG

2. **Generate Revision Material**
   - Click "Generate Revision Material"
   - AI analyzes your content and creates questions

3. **Review & Study**
   - View all generated content in organized sections
   - Flip through interactive flashcards
   - Toggle answers to test yourself

4. **Export & Share**
   - Copy individual items
   - Download entire revision set as PDF
   - Share with classmates

## Project Structure

\`\`\`
innovatex/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Landing page
│   ├── builder/
│   │   └── page.tsx        # Revision builder page
│   ├── api/
│   │   └── generate/
│   │       └── route.ts    # AI generation endpoint
│   └── globals.css         # Global styles & design tokens
├── components/
│   ├── landing-page.tsx
│   ├── revision-builder.tsx
│   ├── file-upload.tsx
│   ├── revision-results.tsx
│   └── sections/
│       ├── mcq-section.tsx
│       ├── true-false-section.tsx
│       ├── short-questions-section.tsx
│       ├── long-questions-section.tsx
│       ├── summary-section.tsx
│       ├── keywords-section.tsx
│       └── flashcards-section.tsx
├── lib/
│   ├── file-parser.ts      # File parsing utilities
│   ├── types.ts            # TypeScript types
│   └── utils.ts            # Helper functions
└── README.md
\`\`\`

## API Integration

### OpenRouter Endpoint

The app uses OpenRouter for AI processing:
- **Model**: `openai/gpt-4o-mini` (free tier)
- **Features**: Text generation, content analysis, question generation

### File Processing

- **PDF**: Uses pdf.js for client-side parsing
- **Audio/Video**: Sends to Whisper API via OpenRouter for transcription
- **Text**: Direct parsing
- **Images**: OCR-ready (placeholder for future enhancement)

## Deployment

### Deploy to Vercel

1. **Push to GitHub**
   \`\`\`bash
   git push origin main
   \`\`\`

2. **Connect to Vercel**
   - Visit [Vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables in Vercel dashboard

3. **Deploy**
   - Vercel automatically deploys on push
   - Your app is live!

### Environment Variables for Vercel

Add these in Vercel Project Settings → Environment Variables:
- `OPENROUTER_API_KEY`: Your OpenRouter API key
- `NEXT_PUBLIC_APP_URL`: Your deployed app URL

## Features Coming Soon

- [ ] Image OCR with Tesseract.js
- [ ] Video subtitle extraction
- [ ] Multiple AI model selection
- [ ] User accounts & saved sessions
- [ ] Collaborative study rooms
- [ ] Mobile app version
- [ ] Answer marking & scoring
- [ ] Study streak tracking

## Troubleshooting

### Issue: "OpenRouter API key not configured"
- **Solution**: Check `.env.local` file contains `OPENROUTER_API_KEY`
- Restart the development server: `npm run dev`

### Issue: PDF won't upload
- **Solution**: Ensure file size < 50MB
- Try a different PDF file
- Check browser console for errors

### Issue: Generation takes too long
- **Solution**: OpenRouter is processing your request
- Check internet connection
- Try with a shorter document first

### Issue: Results look incorrect
- **Solution**: This is often due to file extraction issues
- Try a cleaner PDF or text file
- Report the issue with sample file

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

- **Documentation**: Check the README
- **Issues**: Report bugs on GitHub Issues
- **Questions**: Create a discussion on GitHub

## Acknowledgments

- Built with [Next.js](https://nextjs.org)
- UI Components from [ShadCN UI](https://ui.shadcn.com)
- AI Powered by [OpenRouter](https://openrouter.ai)
- Icons from [Lucide](https://lucide.dev)

---

**Happy Studying! 🚀**
# Ai_Revision_Builder
