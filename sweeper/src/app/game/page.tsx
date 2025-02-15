"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
      relatedConcepts: shuffleArray(rawConcepts.relatedConcepts).slice(0, 90),
      confusingConcepts: shuffleArray(rawConcepts.confusingConcepts).slice(0, 10)
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
        description: "概念生成完成！",
      })
    } catch (error) {
      toast({
        title: "错误",
        description: error instanceof Error ? error.message : "生成概念失败",
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
    <main className="container mx-auto p-4 min-h-screen">
      <ApiKeyDialog onApiKeySet={handleApiKeySet} />
      <div className="max-w-4xl mx-auto space-y-4">
        <Card>
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl">主题扫雷</CardTitle>
              <Link href="/" passHref>
                <Button variant="ghost" size="sm">
                  返回首页
                </Button>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">
              输入一个主题，让 AI 为你的扫雷游戏生成相关概念。
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="输入你的主题（例如：'太空探索'，'日本料理'）"
                    className="flex-1"
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    disabled={isLoading}
                  />
                  <Select
                    value={language}
                    onValueChange={setLanguage}
                    disabled={isLoading}
                  >
                    <SelectTrigger className="w-[100px]">
                      <SelectValue placeholder="语言" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="zh">中文</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <p className="text-xs text-muted-foreground">
                  主题可以是任何你感兴趣的话题。发挥创意！
                </p>
              </div>
              <Button 
                className="w-full" 
                disabled={!hasApiKey || isLoading}
                onClick={handleGenerateConcepts}
              >
                {isLoading ? "生成中..." : "生成概念"}
              </Button>
              {!hasApiKey && (
                <p className="text-xs text-muted-foreground text-center">
                  请先输入 OpenRouter API key 以生成概念
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {concepts && (
          <div className="space-y-4">
            <Board concepts={concepts} />
            <Card className="p-4">
              <h3 className="font-medium mb-2">游戏规则：</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>左键点击格子来揭示概念</li>
                <li>右键点击格子来标记/取消标记地雷</li>
                <li>带有地雷的格子是与主题无关的概念</li>
                <li>数字表示周围8个格子中地雷的数量</li>
                <li>揭示所有非地雷格子即可获胜</li>
              </ul>
            </Card>
          </div>
        )}
      </div>
    </main>
  )
} 