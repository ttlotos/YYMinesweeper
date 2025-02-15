# Theme Minesweeper (主题扫雷)

A unique web-based minesweeper game where players can define custom themes, and AI generates theme-related concepts for game cells. Safe zones are filled with related concepts, while mines are hidden among unrelated concepts.

## Features

- 🎮 Classic minesweeper gameplay with a thematic twist
- 🤖 AI-powered concept generation using Claude via OpenRouter
- 🎨 User-defined themes for personalized gaming experience
- 🌓 Modern UI with dark mode support (coming soon)
- 📱 Responsive design for various screen sizes

## Tech Stack

- **Frontend**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: React Context/Zustand (planned)
- **AI Integration**: OpenRouter API with Claude
- **Deployment**: Vercel (planned)

## Prerequisites

Before you begin, ensure you have installed:
- Node.js 18.17 or later
- pnpm 8.0 or later

## Getting Started

1. Clone the repository:
```bash
git clone [your-repo-url]
cd sweeper
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
# Create a .env.local file and add:
OPENROUTER_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/                  # Next.js app router pages
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   ├── game-board/     # Game board components
│   ├── theme-input/    # Theme input components
│   └── concept-preview/# Concept preview components
├── lib/                # Utilities and API
└── types/              # TypeScript definitions
```

## Development Status

### Completed
- ✅ Project setup and configuration
- ✅ Basic UI implementation
- ✅ Navigation structure
- ✅ Theme input interface

### In Progress
- 🔄 Theme validation
- 🔄 AI integration
- 🔄 Game board implementation

### Planned
- ⏳ Game logic implementation
- ⏳ State management
- ⏳ Dark mode support
- ⏳ Animations and transitions

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with [Next.js](https://nextjs.org)
- UI components from [shadcn/ui](https://ui.shadcn.com)
- AI powered by [Claude](https://anthropic.com/claude) via [OpenRouter](https://openrouter.ai)
