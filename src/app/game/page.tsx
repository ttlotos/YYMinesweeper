import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function GamePage() {
  return (
    <main className="container mx-auto p-4 min-h-screen">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Theme Input
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Theme input component will be added here */}
          <div className="text-center text-muted-foreground">
            Theme input component coming soon...
          </div>
        </CardContent>
      </Card>
    </main>
  )
} 