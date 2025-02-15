# Theme Minesweeper (主题扫雷)

## Project Overview

### Project Description
A web-based minesweeper game that allows users to customize themes. The game uses AI (Claude via OpenRouter) to automatically generate theme-related concepts (safe zones) and unrelated concepts (mine zones).

### Version Goal
Version 1.0 focuses on implementing core game functionality, validating the feasibility and entertainment value of user-defined themes + AI concept generation, and providing a basic gaming experience.

### Target Users
Users interested in minesweeper games, who enjoy exploring different themes and are curious about AI technology applications.

## Technical Stack

- **Frontend Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: React Context or Zustand (to be implemented)
- **API Integration**: OpenRouter API with Claude (to be implemented)
- **Deployment**: Vercel (planned)

## Current Project Status

### Completed Features
1. Project Setup
   - Next.js 14 with TypeScript
   - Tailwind CSS configuration
   - shadcn/ui integration
   - Basic project structure

2. UI Implementation
   - Home page with game introduction
   - Theme input page layout
   - Basic navigation between pages

### Pending Features
1. Theme Input & Processing
2. AI Integration
3. Game Board Implementation
4. Game Logic
5. State Management
6. Styling Refinements

## Project Structure

```
sweeper/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Home page
│   │   ├── layout.tsx            # Root layout
│   │   ├── globals.css           # Global styles
│   │   └── game/
│   │       └── page.tsx          # Game page
│   ├── components/
│   │   ├── ui/                   # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── input.tsx
│   │   │   └── scroll-area.tsx
│   │   ├── game-board/           # Game board components (pending)
│   │   ├── theme-input/          # Theme input components (pending)
│   │   └── concept-preview/      # Concept preview components (pending)
│   ├── lib/
│   │   ├── utils.ts              # Utility functions
│   │   └── api/                  # API integration (pending)
│   └── types/
│       └── index.ts              # Type definitions
├── public/                       # Static assets
├── tailwind.config.ts           # Tailwind configuration
├── components.json              # shadcn/ui configuration
└── package.json                 # Project dependencies
```

## Type Definitions

```typescript
// Game State Interface
interface GameState {
  theme: string;
  board: Cell[][];
  relatedConcepts: string[];
  unrelatedConcepts: string[];
  gameStatus: 'idle' | 'playing' | 'won' | 'lost';
}

// Cell Interface
interface Cell {
  conceptName: string;
  isMine: boolean;
  isRevealed: boolean;
  adjacentMines: number;
}

// API Response Interface
interface OpenRouterResponse {
  relatedConcepts: string[];
  unrelatedConcepts: string[];
}
```

## Implementation Details

### 1. Theme Customization (In Progress)
- Basic input UI implemented
- Theme validation pending
- API integration pending

### 2. AI Integration (Pending)
- OpenRouter API setup needed
- Prompt engineering required
- Error handling to be implemented

### 3. Game Board (Pending)
- Grid layout to be implemented
- Cell component design needed
- Game logic implementation required

### 4. UI/UX Design
#### Implemented
- Clean, modern interface with Tailwind CSS
- Basic responsive design
- shadcn/ui component integration

#### Pending
- Dark mode implementation
- Loading states
- Error handling UI
- Game board styling

## Next Steps

1. Implement theme input validation
2. Set up OpenRouter API integration
3. Create game board component
4. Implement basic game logic
5. Add state management
6. Enhance UI/UX with animations and transitions

## Security Considerations

- API key management (to be implemented)
- Input sanitization (to be implemented)
- Rate limiting (to be planned)
- Error handling (to be implemented)

## Future Enhancements (v2.0+)

- User accounts and progress tracking
- Custom theme saving
- Difficulty levels
- Multiplayer support
- Theme-based visual customization
- Advanced concept editing