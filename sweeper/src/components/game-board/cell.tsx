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

  return (
    <Button
      variant="outline"
      className={cn(
        "w-[72px] h-[72px] p-0 relative",
        "border border-border/50",
        "perspective-[1000px]",
        !isRevealed && "hover:bg-secondary/50",
      )}
      onClick={onClick}
      onContextMenu={handleContextMenu}
    >
      <div className={cn(
        "absolute w-full h-full transition-all duration-500 [transform-style:preserve-3d]",
        isRevealed && "[transform:rotateY(180deg)]"
      )}>
        {/* 正面 */}
        <div className={cn(
          "cell-front absolute w-full h-full flex items-center justify-center p-1",
          !isRevealed && "bg-background hover:bg-secondary/50",
          "border border-border/50 rounded-[calc(theme(borderRadius.md)-1px)]",
          "backdrop-blur-sm"
        )}>
          {!isFlagged ? (
            <span className={cn(
              "text-foreground break-words text-center w-full font-medium",
              conceptName.length <= 3 ? "text-lg" :
              conceptName.length <= 4 ? "text-base" :
              conceptName.length <= 6 ? "text-sm leading-normal" :
              "text-xs leading-[1.1]"
            )}>
              {conceptName}
            </span>
          ) : (
            <span className="text-3xl">🚩</span>
          )}
        </div>
        
        {/* 背面 */}
        <div className={cn(
          "cell-back absolute w-full h-full flex items-center justify-center",
          isMine ? "bg-destructive/90" : "bg-secondary/90",
          "border border-border/50 rounded-[calc(theme(borderRadius.md)-1px)]",
          "backdrop-blur-sm"
        )}>
          {isMine ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="text-3xl">💣</span>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-[200px] break-words">{conceptName}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : adjacentMines > 0 ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className={cn(
                    "font-bold text-2xl",
                    adjacentMines === 1 && "text-blue-500/90",
                    adjacentMines === 2 && "text-green-500/90",
                    adjacentMines === 3 && "text-red-500/90",
                    adjacentMines === 4 && "text-purple-500/90",
                    adjacentMines >= 5 && "text-yellow-500/90"
                  )}>
                    {adjacentMines}
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-[200px] break-words">{conceptName}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : null}
        </div>
      </div>
    </Button>
  )
}

// Add this CSS to your globals.css file:
/*
.cell-front, .cell-back {
  backface-visibility: hidden;
  transform-style: preserve-3d;
}

.cell-back {
  transform: rotateY(180deg);
}
*/ 