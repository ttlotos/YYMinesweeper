import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <main className="container mx-auto p-4 min-h-screen">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center text-3xl">
            Theme Minesweeper
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-4">
            <p className="text-center text-muted-foreground">
              A unique minesweeper game where you define the theme and AI generates the concepts.
            </p>
            <Link href="/game" passHref>
              <Button>Start Game</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  )
} 