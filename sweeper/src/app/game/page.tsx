"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ApiKeyDialog } from "@/components/api-key-dialog"
import { getApiKey } from "@/lib/cookies"
import { generateConcepts, type ConceptsResponse } from "@/lib/api"
import { useToast } from "@/components/ui/use-toast"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useEffect } from "react"
import { Board } from "@/components/game-board/board"

// 随机打乱数组
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export default function GamePage() {
  const [mounted, setMounted] = useState(false)
  const [hasApiKey, setHasApiKey] = useState(false)
  const [theme, setTheme] = useState("")
  const [language, setLanguage] = useState("zh")
  const [isLoading, setIsLoading] = useState(false)
  const [concepts, setConcepts] = useState<ConceptsResponse | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    setMounted(true)
    setHasApiKey(!!getApiKey())
  }, [])

  const handleApiKeySet = () => {
    setHasApiKey(true)
  }

  const selectConcepts = useCallback((rawConcepts: ConceptsResponse): ConceptsResponse => {
    return {
      relatedConcepts: shuffleArray(rawConcepts.relatedConcepts).slice(0, 80),
      confusingConcepts: shuffleArray(rawConcepts.confusingConcepts).slice(0, 20)
    };
  }, []);

  const handleGenerateConcepts = async () => {
    if (!theme.trim()) {
      toast({
        title: "错误",
        description: "请先输入主题",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const response = await generateConcepts(theme, language)
      const selectedConcepts = selectConcepts(response)
      setConcepts(selectedConcepts)
      toast({
        title: "成功",
        description: "人物生成完成！",
      })
    } catch (error) {
      toast({
        title: "错误",
        description: error instanceof Error ? error.message : "生成人物失败",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted">
      <ApiKeyDialog onApiKeySet={handleApiKeySet} />
      
      {/* Minimal Header */}
      <header className="fixed top-0 left-0 right-0 z-10 bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
              ←
            </Button>
            <span className="text-sm font-medium">返回首页</span>
          </Link>
          <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            人物扫雷
          </h1>
          <div className="w-20" /> {/* Spacer for balance */}
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-24 pb-8">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Game Setup Card */}
          <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <h2 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">探索人物</h2>
                <p className="text-muted-foreground">
                  输入一个人物主题，让 AI 为你生成相关人物
                </p>
              </div>

              <div className="flex gap-3">
                <Input
                  type="text"
                  placeholder="输入主题（如：'三国时期武将'，'明朝官员'，'中国皇帝'）"
                  className="flex-1 h-12 rounded-full bg-background/50"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  disabled={isLoading}
                />
                <Select
                  value={language}
                  onValueChange={setLanguage}
                  disabled={isLoading}
                >
                  <SelectTrigger className="w-24 h-12 rounded-full bg-background/50">
                    <SelectValue placeholder="语言" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="zh">中文</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                className="w-full h-12 rounded-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                disabled={!hasApiKey || isLoading}
                onClick={handleGenerateConcepts}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-background border-r-transparent" />
                    AI 正在生成...
                  </span>
                ) : (
                  "开始生成"
                )}
              </Button>

              {!hasApiKey && (
                <div className="p-4 rounded-2xl bg-background/50 text-sm text-muted-foreground">
                  ⚠️ 请先设置 OpenRouter API Key 以开始游戏
                </div>
              )}
            </div>
          </div>

          {/* Game Board Section */}
          {concepts && (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">游戏面板</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="px-3 py-1 rounded-full bg-background/50">左键：揭示</span>
                      <span className="px-3 py-1 rounded-full bg-background/50">右键：标记</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Board concepts={concepts} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
} 