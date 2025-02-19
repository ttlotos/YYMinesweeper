import { useCallback, useEffect, useState } from "react"
import { Cell } from "./cell"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface BoardProps {
  concepts: {
    relatedConcepts: string[]
    confusingConcepts: string[]
  }
  size?: {
    rows: number
    cols: number
  }
}

interface GameCell {
  conceptName: string
  isMine: boolean
  isRevealed: boolean
  isFlagged: boolean
  adjacentMines: number
}

export function Board({ 
  concepts,
  size = { rows: 10, cols: 10 }
}: BoardProps) {
  const [board, setBoard] = useState<GameCell[][]>([])
  const [gameStatus, setGameStatus] = useState<'idle' | 'playing' | 'won' | 'lost'>('idle')
  const [minesCount, setMinesCount] = useState(0)
  const [flagsCount, setFlagsCount] = useState(0)
  const [firstClick, setFirstClick] = useState(true)

  const initializeBoard = useCallback(() => {
    const { rows, cols } = size
    const totalCells = rows * cols
    const CONFUSING_CONCEPTS_COUNT = 20
    const RELATED_CONCEPTS_COUNT = 80

    // 确保概念数量正确
    let normalizedConfusingConcepts: string[]
    if (concepts.confusingConcepts.length >= CONFUSING_CONCEPTS_COUNT) {
      // 如果混淆概念足够，只取前20个
      normalizedConfusingConcepts = concepts.confusingConcepts.slice(0, CONFUSING_CONCEPTS_COUNT)
    } else {
      // 如果不够20个，使用填充内容
      normalizedConfusingConcepts = Array(CONFUSING_CONCEPTS_COUNT)
        .fill(null)
        .map((_, i) => {
          if (i < concepts.confusingConcepts.length) {
            return concepts.confusingConcepts[i]
          }
          return `混淆概念 ${i + 1}`
        })
    }

    let normalizedRelatedConcepts: string[]
    if (concepts.relatedConcepts.length >= RELATED_CONCEPTS_COUNT) {
      // 如果相关概念足够，只取前80个
      normalizedRelatedConcepts = concepts.relatedConcepts.slice(0, RELATED_CONCEPTS_COUNT)
    } else {
      // 如果不够80个，使用填充内容
      normalizedRelatedConcepts = Array(RELATED_CONCEPTS_COUNT)
        .fill(null)
        .map((_, i) => {
          if (i < concepts.relatedConcepts.length) {
            return concepts.relatedConcepts[i]
          }
          return `相关概念 ${i + 1}`
        })
    }

    // Create empty board
    const newBoard: GameCell[][] = Array(rows).fill(null).map(() =>
      Array(cols).fill(null).map(() => ({
        conceptName: "",
        isMine: false,
        isRevealed: false,
        isFlagged: false,
        adjacentMines: 0
      }))
    )

    // 随机排序混淆概念（地雷）和正常概念
    const shuffledConfusingConcepts = [...normalizedConfusingConcepts].sort(() => Math.random() - 0.5)
    const shuffledRelatedConcepts = [...normalizedRelatedConcepts].sort(() => Math.random() - 0.5)
    
    // 放置地雷（混淆概念）
    let mineIndex = 0
    const minePositions = new Set()
    
    while (minePositions.size < CONFUSING_CONCEPTS_COUNT) {
      const row = Math.floor(Math.random() * rows)
      const col = Math.floor(Math.random() * cols)
      const pos = `${row},${col}`
      if (!minePositions.has(pos)) {
        minePositions.add(pos)
        newBoard[row][col].isMine = true
        newBoard[row][col].conceptName = shuffledConfusingConcepts[mineIndex++]
      }
    }

    // 放置正常概念
    let conceptIndex = 0
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (!newBoard[row][col].isMine) {
          newBoard[row][col].conceptName = shuffledRelatedConcepts[conceptIndex++]
        }
      }
    }

    // Calculate adjacent mines
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (!newBoard[row][col].isMine) {
          let count = 0
          for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
              if (i === 0 && j === 0) continue
              const newRow = row + i
              const newCol = col + j
              if (
                newRow >= 0 && newRow < rows &&
                newCol >= 0 && newCol < cols &&
                newBoard[newRow][newCol].isMine
              ) {
                count++
              }
            }
          }
          newBoard[row][col].adjacentMines = count
        }
      }
    }

    setBoard(newBoard)
    setMinesCount(CONFUSING_CONCEPTS_COUNT)
    setFlagsCount(0)
    setGameStatus('playing')
    setFirstClick(true)
  }, [concepts, size])

  useEffect(() => {
    initializeBoard()
  }, [concepts])

  const revealCell = (row: number, col: number) => {
    if (gameStatus !== 'playing') return
    if (board[row][col].isFlagged) return
    if (firstClick) {
      setFirstClick(false)
    }

    const newBoard = [...board]
    
    if (board[row][col].isMine) {
      // Game over - reveal all mines
      for (let i = 0; i < size.rows; i++) {
        for (let j = 0; j < size.cols; j++) {
          if (newBoard[i][j].isMine) {
            newBoard[i][j].isRevealed = true
          }
        }
      }
      setBoard(newBoard)
      setGameStatus('lost')
      return
    }

    const revealAdjacentCells = (r: number, c: number) => {
      if (
        r < 0 || r >= size.rows ||
        c < 0 || c >= size.cols ||
        newBoard[r][c].isRevealed ||
        newBoard[r][c].isFlagged
      ) {
        return
      }

      newBoard[r][c].isRevealed = true

      if (newBoard[r][c].adjacentMines === 0) {
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue
            revealAdjacentCells(r + i, c + j)
          }
        }
      }
    }

    revealAdjacentCells(row, col)
    setBoard(newBoard)

    // Check if won
    let unrevealed = 0
    for (let i = 0; i < size.rows; i++) {
      for (let j = 0; j < size.cols; j++) {
        if (!newBoard[i][j].isRevealed && !newBoard[i][j].isMine) {
          unrevealed++
        }
      }
    }
    if (unrevealed === 0) {
      setGameStatus('won')
    }
  }

  const toggleFlag = (row: number, col: number) => {
    if (gameStatus !== 'playing') return
    if (board[row][col].isRevealed) return

    const newBoard = [...board]
    const cell = newBoard[row][col]
    
    if (cell.isFlagged) {
      cell.isFlagged = false
      setFlagsCount(prev => prev - 1)
    } else if (flagsCount < minesCount) {
      cell.isFlagged = true
      setFlagsCount(prev => prev + 1)
    }
    
    setBoard(newBoard)
  }

  return (
    <div className="w-full max-w-[900px] mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 rounded-full bg-background/50 backdrop-blur-sm">
            <span className="text-sm font-medium">地雷: {minesCount}</span>
          </div>
          <div className="px-4 py-2 rounded-full bg-background/50 backdrop-blur-sm">
            <span className="text-sm font-medium">标记: {flagsCount}</span>
          </div>
        </div>
        <Button
          variant="outline"
          className="rounded-full px-6"
          onClick={initializeBoard}
          disabled={gameStatus === 'playing'}
        >
          重新开始
        </Button>
      </div>
      
      <div className="p-6 rounded-2xl backdrop-blur-sm">
        <div className="flex justify-center">
          <div 
            className="grid gap-2 p-4 rounded-xl border bg-background/50" 
            style={{
              gridTemplateColumns: `repeat(${size.cols}, 72px)`,
            }}
          >
            {board.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <Cell
                  key={`${rowIndex}-${colIndex}`}
                  conceptName={cell.conceptName}
                  isMine={cell.isMine}
                  isRevealed={cell.isRevealed}
                  isFlagged={cell.isFlagged}
                  adjacentMines={cell.adjacentMines}
                  onClick={() => revealCell(rowIndex, colIndex)}
                  onRightClick={() => toggleFlag(rowIndex, colIndex)}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {gameStatus !== 'playing' && (
        <div className="mt-8 text-center font-medium text-lg">
          {gameStatus === 'won' ? '🎉 恭喜获胜！' : gameStatus === 'lost' ? '💥 游戏结束！' : '开始新游戏'}
        </div>
      )}
    </div>
  )
} 