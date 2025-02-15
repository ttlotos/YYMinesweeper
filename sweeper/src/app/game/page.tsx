import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function GamePage() {
  return (
    <main className="container mx-auto p-4 min-h-screen">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">Theme Input</CardTitle>
            <Link href="/" passHref>
              <Button variant="ghost" size="sm">
                Back to Home
              </Button>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">
            Enter a theme and let AI generate related concepts for your minesweeper game.
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Enter your theme (e.g., 'Space Exploration', 'Japanese Cuisine')"
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                The theme can be any topic you're interested in. Be creative!
              </p>
            </div>
            <Button className="w-full">
              Generate Concepts
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  )
} 