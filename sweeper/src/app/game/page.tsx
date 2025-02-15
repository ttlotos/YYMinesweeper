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
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            人物扫雷
          </h1>
          <Link href="/" passHref>
            <Button variant="ghost" size="sm" className="rounded-full">
              返回首页
            </Button>
          </Link>
        </div>

        {/* Game Setup Section */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm space-y-6">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">开始你的探索</h2>
              <p className="text-sm text-muted-foreground">
                输入一个主题，让 AI 为你生成相关人物清单
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex gap-3">
                <Input
                  type="text"
                  placeholder="输入你的主题（例如：'中国古代'，'好莱坞电影'）"
                  className="flex-1 rounded-full h-12"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  disabled={isLoading}
                />
                <Select
                  value={language}
                  onValueChange={setLanguage}
                  disabled={isLoading}
                >
                  <SelectTrigger className="w-[100px] rounded-full h-12">
                    <SelectValue placeholder="语言" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="zh">中文</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                className="w-full rounded-full h-12 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70" 
                disabled={!hasApiKey || isLoading}
                onClick={handleGenerateConcepts}
              >
                {isLoading ? "AI 正在生成中..." : "开始生成"}
              </Button>

              {!hasApiKey && (
                <p className="text-sm text-muted-foreground text-center">
                  请先设置 OpenRouter API Key 以开始游戏
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Game Board Section */}
        {concepts && (
          <div className="space-y-6 max-w-4xl mx-auto">
            <Board concepts={concepts} />
            
            {/* Game Rules Card */}
            <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm">
              <h3 className="text-lg font-semibold mb-3">游戏规则</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <p className="font-medium">基本操作</p>
                  <p className="text-sm text-muted-foreground">左键点击揭示人物，右键标记地雷</p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium">数字提示</p>
                  <p className="text-sm text-muted-foreground">数字表示周围8格中的地雷数量</p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium">胜利条件</p>
                  <p className="text-sm text-muted-foreground">成功找出所有相关人物即可获胜</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
} 