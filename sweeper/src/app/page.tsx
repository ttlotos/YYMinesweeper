import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center space-y-8 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            人物扫雷
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">
            一个独特的扫雷游戏，探索 AI 为你生成的人物世界
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link href="/game" passHref>
              <Button size="lg" className="text-lg px-8 py-6 rounded-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                开始游戏
              </Button>
            </Link>
          </div>

          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm">
              <h3 className="text-lg font-semibold mb-2">输入主题</h3>
              <p className="text-muted-foreground">
                选择任何你感兴趣的主题领域
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm">
              <h3 className="text-lg font-semibold mb-2">AI 生成</h3>
              <p className="text-muted-foreground">
                智能生成相关人物和迷惑选项
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm">
              <h3 className="text-lg font-semibold mb-2">探索发现</h3>
              <p className="text-muted-foreground">
                在游戏中探索和学习相关人物
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
