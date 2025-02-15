# Character Minesweeper (人物扫雷)

## Project Overview

### Project Description
A web-based minesweeper game that allows users to input characters (real or fictional). The game uses AI (Claude via OpenRouter) to automatically generate character-related concepts (safe zones) and unrelated concepts (mine zones).

### Version Goal
Version 1.0 focuses on implementing core game functionality, validating the feasibility and entertainment value of character-based + AI concept generation, and providing a basic gaming experience.

### Target Users
Users interested in minesweeper games, who enjoy exploring different characters and are curious about AI technology applications.

## Technical Stack

- **Frontend Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: React useState + useCallback
- **API Integration**: OpenRouter API with Claude
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
   - Game board implementation
   - Basic navigation between pages

3. Game Implementation
   - Core minesweeper mechanics
   - Concept-based gameplay
   - Interactive cell revealing
   - Flag placement system
   - Win/lose conditions

### Game Mechanics Details

1. Board Configuration
   - 10x10 grid layout
   - 20 mines (unrelated concepts)
   - 80 safe cells (character-related concepts)

2. Concept Distribution
   - Mines are mapped to unrelated concepts (20)
   - Safe cells are mapped to character-related concepts (80)
   - Concepts are randomly distributed on the board
   - Concept normalization system:
     ```typescript
     // For confusing concepts (mines)
     if (count >= 20) -> use first 20
     if (0 < count < 20) -> cycle through available concepts
     if (count = 0) -> use placeholder concepts

     // For related concepts (safe cells)
     if (count >= 80) -> use first 80
     if (0 < count < 80) -> cycle through available concepts
     if (count = 0) -> use placeholder concepts
     ```

3. Gameplay Features
   - First click safety
   - Adjacent mine counting
   - Recursive cell revealing for empty cells
   - Flag placement system
   - Win/lose state management
   - Game restart functionality

4. UI Elements
   - Concept display on unrevealed cells
   - Mine count and flag count display
   - Tooltip system for revealed cells
   - Color-coded numbers for adjacent mine counts
   - Game status messages
   - Restart button

## Project Structure

```
sweeper/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Home page
│   │   ├── layout.tsx            # Root layout
│   │   ├── globals.css           # Global styles
│   │   └── game/
│   │       └── page.tsx          # Game page with theme input and board
│   ├── components/
│   │   ├── ui/                   # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── input.tsx
│   │   │   ├── tooltip.tsx
│   │   │   └── scroll-area.tsx
│   │   ├── game-board/          # Game components
│   │   │   ├── board.tsx        # Main game board logic
│   │   │   └── cell.tsx         # Individual cell component
│   │   ├── api-key-dialog.tsx   # API key input dialog
│   │   └── theme-input/         # Theme input components
│   ├── lib/
│   │   ├── utils.ts             # Utility functions
│   │   ├── cookies.ts           # Cookie management
│   │   └── api.ts               # API integration
│   └── types/
│       └── index.ts             # Type definitions
```

## Type Definitions

```typescript
// Game State Interface
interface GameCell {
  conceptName: string
  isMine: boolean
  isRevealed: boolean
  isFlagged: boolean
  adjacentMines: number
}

// API Response Interface
interface ConceptsResponse {
  relatedConcepts: string[]    // At least 80 items required
  confusingConcepts: string[]  // At least 20 items required
}
```

## Implementation Details

### 1. Character Input
- Character input with language selection (zh/en)
- API integration for concept generation
- Concept normalization and distribution

### 2. Game Board
- Dynamic grid generation
- Cell state management
- Interactive cell revealing
- Flag placement system
- Adjacent mine calculation
- Win/lose condition checking

### 3. UI/UX Design
- Clean, modern interface with Tailwind CSS
- Responsive design
- Tooltips for revealed cells
- Color-coded numbers
- Game status indicators
- Flag counter

## Next Steps

1. Add difficulty levels
2. Implement theme saving
3. Add animation effects
4. Improve mobile experience
5. Add sound effects
6. Implement statistics tracking

## Security Considerations

- API key management via cookies
- Input sanitization
- Rate limiting via OpenRouter
- Error handling with user feedback

## Future Enhancements (v2.0+)

- User accounts and progress tracking
- Custom theme saving
- Multiple difficulty levels
- Multiplayer support
- Theme-based visual customization
- Advanced concept editing