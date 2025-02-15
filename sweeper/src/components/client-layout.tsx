"use client"

import { useEffect, useState } from "react"
import { Toaster } from "@/components/toaster"

interface ClientLayoutProps {
  children: React.ReactNode
  className?: string
}

export default function ClientLayout({ children, className }: ClientLayoutProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className={`${className} min-h-screen bg-background`}>
        <div className="min-h-screen bg-background" />
      </div>
    )
  }

  return (
    <div className={`${className} min-h-screen bg-background`}>
      {children}
      <Toaster />
    </div>
  )
} 