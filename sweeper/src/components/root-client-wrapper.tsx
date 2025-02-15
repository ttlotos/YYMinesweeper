"use client"

import dynamic from 'next/dynamic'
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

const ClientLayout = dynamic(
  () => import('@/components/client-layout'),
  { 
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-background" />
    )
  }
)

export default function RootClientWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientLayout className={inter.className}>{children}</ClientLayout>
} 