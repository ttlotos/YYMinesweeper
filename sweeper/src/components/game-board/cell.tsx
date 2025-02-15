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
      return "🚩"
    }

    if (!isRevealed) {
      return <span className="text-foreground">{conceptName}</span>
    }

    if (isMine) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span>💣</span>
            </TooltipTrigger>
            <TooltipContent>
              <p>{conceptName}</p>
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
              <span className={cn(
                "font-bold text-base",
                adjacentMines === 1 && "text-blue-500",
                adjacentMines === 2 && "text-green-500",
                adjacentMines === 3 && "text-red-500",
                adjacentMines === 4 && "text-purple-500",
                adjacentMines >= 5 && "text-yellow-500"
              )}>
                {adjacentMines}
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>{conceptName}</p>
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
        "w-full h-full min-h-[60px] p-1 text-xs sm:text-sm border relative",
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