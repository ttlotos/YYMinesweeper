import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface CellProps {
  conceptName: string
  isMine: boolean
  isRevealed: boolean
  isFlagged: boolean
  adjacentMines: number
  onClick: () => void
  onRightClick: (e: React.MouseEvent) => void
}

export function Cell({
  conceptName,
  isMine,
  isRevealed,
  isFlagged,
  adjacentMines,
  onClick,
  onRightClick,
}: CellProps) {
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    onRightClick(e)
  }

  const renderContent = () => {
    if (isFlagged) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-3xl">🚩</span>
        </div>
      )
    }

    if (!isRevealed) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-foreground text-sm leading-tight break-words text-center w-[90%] line-clamp-3">
            {conceptName}
          </span>
        </div>
      )
    }

    if (isMine) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-3xl">💣</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-[200px] break-words">{conceptName}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    }

    if (adjacentMines > 0) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="w-full h-full flex items-center justify-center">
                <span className={cn(
                  "font-bold text-2xl",
                  adjacentMines === 1 && "text-blue-500",
                  adjacentMines === 2 && "text-green-500",
                  adjacentMines === 3 && "text-red-500",
                  adjacentMines === 4 && "text-purple-500",
                  adjacentMines >= 5 && "text-yellow-500"
                )}>
                  {adjacentMines}
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-[200px] break-words">{conceptName}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    }

    return null // 空白格子
  }

  return (
    <Button
      variant="outline"
      className={cn(
        "w-[72px] h-[72px] p-0 border relative overflow-hidden",
        isRevealed && "bg-secondary",
        isRevealed && isMine && "bg-destructive hover:bg-destructive",
        !isRevealed && "hover:bg-secondary/50",
        "transition-colors"
      )}
      onClick={onClick}
      onContextMenu={handleContextMenu}
    >
      {renderContent()}
    </Button>
  )
} 