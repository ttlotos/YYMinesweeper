# Character Minesweeper

[English](./README.md) | [简体中文](./README.zh-CN.md)

A unique minesweeper game that lets you explore an AI-generated world of characters. Input any theme that interests you, and watch as AI intelligently generates relevant characters and misleading options. Through gameplay, discover and learn about characters related to your chosen theme.

## Features

- 🎮 Classic minesweeper gameplay (10x10 grid, 20 mines)
- 🤖 AI-powered concept generation using Claude via OpenRouter
- 👤 Character-based concept mapping:
  - 80 safe cells with character-related concepts
  - 20 mines with character-unrelated concepts
- 🎯 Interactive gameplay:
  - Left-click to reveal cells
  - Right-click to place/remove flags
  - Tooltips showing concepts on revealed cells
  - Color-coded numbers for adjacent mine counts
- 🌏 Multi-language support (Chinese/English)
- 📱 Responsive design for various screen sizes

## Screenshots

Here are some screenshots of the game interface:

### Home Page
![Home Page](./assets/screenshots/home.png)
*The landing page where you can start a new game*

### Character Input
![Character Input](./assets/screenshots/character-input.png)
*Input your chosen character and select language*

### Gameplay
![Gameplay](./assets/screenshots/gameplay.png)
*Active gameplay showing revealed cells and flags*

### Game Over
![Game Over](./assets/screenshots/game-over.png)
*Game over screen showing all cells*

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
2. Input a character of your choice (e.g., "Sherlock Holmes", "Marie Curie")
3. Select your preferred language (中文/English)
4. Wait for AI to generate character-related concepts
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
- ✅ Character-based gameplay
- ✅ Multi-language support
- ✅ Basic UI/UX implementation

### Planned Features
- ⏳ Difficulty levels
- ⏳ Character saving
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
