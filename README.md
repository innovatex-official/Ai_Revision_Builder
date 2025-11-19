# 🚀 InnovateX - AI Revision Builder

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Next.js](https://img.shields.io/badge/Next.js-14-black.svg)

**Transform your study materials into comprehensive revision content powered by AI**

[Features](#-features) • [Demo](#-quick-start) • [Installation](#-installation) • [Documentation](#-documentation) • [Contributing](#-contributing)

</div>

---

## ✨ Features

### 📤 Multi-Format Support
Upload and process various file types seamlessly:
- 📄 **Documents**: PDF, TXT
- 🎵 **Audio**: MP3, WAV
- 🎥 **Video**: MP4, MOV
- 🖼️ **Images**: PNG, JPG

### 🤖 AI-Powered Content Generation
Get comprehensive revision materials instantly:
- ✅ 10 Multiple Choice Questions (MCQs)
- ✓ 5 True/False Questions
- ✍️ 5 Short Answer Questions
- 📝 3 Long Answer Questions
- 📋 Comprehensive Summary
- 🔑 Key Terms & Keywords
- 🎴 Interactive Flashcards

### 🎨 Modern User Experience
- 🌓 Beautiful dark mode support
- 📱 Fully responsive design
- ⚡ Lightning-fast generation
- 💾 Easy export and sharing options
- 🎯 Intuitive interface

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | Next.js 14, React, TypeScript, Tailwind CSS, ShadCN UI |
| **Backend** | Next.js API Routes |
| **AI Engine** | OpenRouter (GPT-4o-mini support) |
| **File Processing** | pdf.js, ffmpeg.wasm, Native JavaScript |
| **Deployment** | Vercel-ready |

---

## 📦 Installation

### Prerequisites

Before you begin, ensure you have:
- Node.js 18 or higher
- npm or yarn package manager
- Git installed on your machine

### Step-by-Step Setup

1️⃣ **Clone the repository**

```bash
git clone https://github.com/innovatex-official/Ai_Revision_Builder.git
cd Ai_Revision_Builder
```

2️⃣ **Install dependencies**

```bash
npm install
# or
yarn install
```

3️⃣ **Configure environment variables**

Create a `.env.local` file in the root directory:

```env
OPENROUTER_API_KEY=your_openrouter_api_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> 💡 **Getting your OpenRouter API Key:**
> 1. Visit [OpenRouter.ai](https://openrouter.ai)
> 2. Sign up for a free account
> 3. Navigate to your dashboard
> 4. Copy your API key
> 5. Paste it into `.env.local`

4️⃣ **Start the development server**

```bash
npm run dev
# or
yarn dev
```

5️⃣ **Open in your browser**

Navigate to `http://localhost:3000` and start building!

---

## 🎯 Quick Start

### Basic Usage Flow

1. **📤 Upload Your Content**
   - Drag and drop files or click to browse
   - Supports documents, audio, video, and images
   - Maximum file size: 50MB

2. **🔮 Generate Revision Material**
   - Click the "Generate Revision Material" button
   - AI analyzes your content intelligently
   - Processing typically takes 10-30 seconds

3. **📚 Review & Study**
   - Browse through organized question sections
   - Use interactive flashcards for quick review
   - Toggle answer visibility to test yourself

4. **💾 Export & Share**
   - Copy individual questions or answers
   - Download complete revision set as PDF
   - Share with classmates or study groups

---

## 📂 Project Structure

```
innovatex/
├── 📁 app/
│   ├── layout.tsx                    # Root layout with metadata
│   ├── page.tsx                      # Landing page
│   ├── 📁 builder/
│   │   └── page.tsx                  # Main revision builder
│   ├── 📁 api/
│   │   └── 📁 generate/
│   │       └── route.ts              # AI generation endpoint
│   └── globals.css                   # Global styles & design tokens
│
├── 📁 components/
│   ├── landing-page.tsx              # Landing page component
│   ├── revision-builder.tsx          # Main builder interface
│   ├── file-upload.tsx               # File upload component
│   ├── revision-results.tsx          # Results display
│   └── 📁 sections/
│       ├── mcq-section.tsx           # Multiple choice questions
│       ├── true-false-section.tsx    # True/false questions
│       ├── short-questions-section.tsx
│       ├── long-questions-section.tsx
│       ├── summary-section.tsx
│       ├── keywords-section.tsx
│       └── flashcards-section.tsx
│
├── 📁 lib/
│   ├── file-parser.ts                # File parsing utilities
│   ├── types.ts                      # TypeScript type definitions
│   └── utils.ts                      # Helper functions
│
└── README.md                         # You are here!
```

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push your code to GitHub**

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Import to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel auto-detects Next.js configuration

3. **Add environment variables**

Navigate to: `Project Settings → Environment Variables`

Add the following:
- `OPENROUTER_API_KEY`: Your OpenRouter API key
- `NEXT_PUBLIC_APP_URL`: Your production URL

4. **Deploy**

Vercel automatically deploys on every push to main branch!

---

## 🔧 API Integration

### OpenRouter Configuration

```typescript
// Default model configuration
{
  model: "openai/gpt-4o-mini",  // Free tier available
  features: [
    "Text generation",
    "Content analysis", 
    "Question generation",
    "Audio transcription (Whisper)"
  ]
}
```

### Supported File Processing

| File Type | Method | Library |
|-----------|--------|---------|
| PDF | Client-side parsing | pdf.js |
| Audio/Video | Whisper API transcription | OpenRouter |
| Text | Direct parsing | Native JS |
| Images | OCR (coming soon) | Tesseract.js |

---

## 🐛 Troubleshooting

<details>
<summary><strong>❌ "OpenRouter API key not configured"</strong></summary>

**Solution:**
1. Verify `.env.local` contains `OPENROUTER_API_KEY`
2. Ensure no trailing spaces in the API key
3. Restart development server: `npm run dev`
4. Clear browser cache and reload
</details>

<details>
<summary><strong>📄 PDF won't upload</strong></summary>

**Solution:**
1. Check file size is under 50MB
2. Ensure PDF isn't password-protected
3. Try a different PDF file
4. Check browser console for specific errors
</details>

<details>
<summary><strong>⏱️ Generation takes too long</strong></summary>

**Solution:**
1. OpenRouter may be under heavy load
2. Verify stable internet connection
3. Try with a shorter document first
4. Check OpenRouter status page
</details>

<details>
<summary><strong>🔍 Incorrect or garbled results</strong></summary>

**Solution:**
1. Ensure uploaded file has clear, readable text
2. Avoid scanned PDFs without OCR
3. Try extracting text manually first
4. Report issues with sample files on GitHub
</details>

---

## 🗺️ Roadmap

### Coming Soon

- [ ] 🖼️ Advanced Image OCR with Tesseract.js
- [ ] 📹 Video subtitle extraction
- [ ] 🎛️ Multiple AI model selection
- [ ] 👤 User accounts & saved sessions
- [ ] 🤝 Collaborative study rooms
- [ ] 📱 Progressive Web App (PWA)
- [ ] ✏️ Answer marking & scoring system
- [ ] 🔥 Study streak tracking
- [ ] 📊 Performance analytics dashboard
- [ ] 🌍 Multi-language support

### Future Enhancements

- Advanced spaced repetition algorithms
- Integration with popular LMS platforms
- Voice-based question practice
- Peer review and sharing features
- Custom question templates

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Contribution Guidelines

- Follow the existing code style
- Write clear commit messages
- Add tests for new features
- Update documentation as needed
- Be respectful and constructive

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

You are free to:
- ✅ Use commercially
- ✅ Modify
- ✅ Distribute
- ✅ Use privately

---

## 💬 Support & Community

### Get Help

- 📖 **Documentation**: Check this README first
- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/innovatex-official/Ai_Revision_Builder/issues)
- 💭 **Discussions**: [GitHub Discussions](https://github.com/innovatex-official/Ai_Revision_Builder/discussions)
- 📧 **Email**: support@innovatex.ai

### Stay Connected

- ⭐ Star this repo to show support
- 👀 Watch for updates
- 🍴 Fork to contribute

---

## 🙏 Acknowledgments

Built with amazing open-source technologies:

- [Next.js](https://nextjs.org) - The React Framework for Production
- [ShadCN UI](https://ui.shadcn.com) - Beautifully designed components
- [OpenRouter](https://openrouter.ai) - Unified AI API gateway
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- [Lucide Icons](https://lucide.dev) - Beautiful & consistent icons
- [pdf.js](https://mozilla.github.io/pdf.js/) - PDF rendering
- [ffmpeg.wasm](https://ffmpegwasm.netlify.app/) - Media processing

---

<div align="center">

**Made with ❤️ by InnovateX**

[⬆ Back to Top](#-innovatex---ai-revision-builder)

</div>