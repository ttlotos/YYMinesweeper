# Theme Minesweeper (主题扫雷)

A unique web-based minesweeper game where players can define custom themes, and AI generates theme-related concepts for game cells. Safe zones are filled with related concepts, while mines are hidden among unrelated concepts.

## Features

- 🎮 Classic minesweeper gameplay (10x10 grid, 20 mines)
- 🤖 AI-powered concept generation using Claude via OpenRouter
- 🎨 Theme-based concept mapping:
  - 80 safe cells with theme-related concepts
  - 20 mines with theme-unrelated concepts
- 🎯 Interactive gameplay:
  - Left-click to reveal cells
  - Right-click to place/remove flags
  - Tooltips showing concepts on revealed cells
  - Color-coded numbers for adjacent mine counts
- 🌏 Multi-language support (中文/English)
- 📱 Responsive design for various screen sizes

## Tech Stack

- **Frontend**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: React hooks (useState + useCallback)
- **AI Integration**: OpenRouter API with Claude
- **Language**: TypeScript

## Prerequisites

Before you begin, ensure you have:
- Node.js 18.17 or later
- pnpm 8.0 or later
- An OpenRouter API key (get one at https://openrouter.ai)

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/YYMinesweeper.git
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

## How to Play

1. Enter your OpenRouter API key when prompted
2. Input a theme of your choice (e.g., "Japanese cuisine", "Space exploration")
3. Select your preferred language (中文/English)
4. Wait for AI to generate theme-related concepts
5. Start playing:
   - Left-click to reveal cells
   - Right-click to place/remove flags
   - Numbers show adjacent mines
   - Hover over revealed cells to see concepts
   - Flag all mines and reveal all safe cells to win

## Project Structure

```
src/
├── app/                 # Next.js app router pages
├── components/         # React components
│   ├── ui/            # shadcn/ui components
│   ├── game-board/    # Game board & cell components
│   └── api-key-dialog # API key management
├── lib/               # Utilities and API integration
└── types/             # TypeScript definitions
```

## Development Status

### Completed
- ✅ Core minesweeper mechanics
- ✅ AI concept generation
- ✅ Theme-based gameplay
- ✅ Multi-language support
- ✅ Basic UI/UX implementation

### Planned Features
- ⏳ Difficulty levels
- ⏳ Theme saving
- ⏳ Statistics tracking
- ⏳ Sound effects
- ⏳ Dark mode support

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
