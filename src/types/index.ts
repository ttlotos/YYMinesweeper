export interface GameState {
  theme: string;
  board: Cell[][];
  relatedConcepts: string[];
  unrelatedConcepts: string[];
  gameStatus: 'idle' | 'playing' | 'won' | 'lost';
}

export interface Cell {
  conceptName: string;
  isMine: boolean;
  isRevealed: boolean;
  adjacentMines: number;
}

export interface OpenRouterResponse {
  relatedConcepts: string[];
  unrelatedConcepts: string[];
} 