"use client"

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { getApiKey, setApiKey } from '@/lib/cookies'

interface ApiKeyDialogProps {
  onApiKeySet: () => void
}

export function ApiKeyDialog({ onApiKeySet }: ApiKeyDialogProps) {
  const [open, setOpen] = useState(false)
  const [apiKey, setApiKeyState] = useState('')

  useEffect(() => {
    const key = getApiKey()
    if (!key) {
      setOpen(true)
    }
  }, [])

  const handleSave = () => {
    if (apiKey.trim()) {
      setApiKey(apiKey.trim())
      setOpen(false)
      onApiKeySet()
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter OpenRouter API Key</DialogTitle>
          <DialogDescription>
            Please enter your OpenRouter API key to use the AI features. Your key will be stored securely in your browser.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            placeholder="sk-or-v1-..."
            value={apiKey}
            onChange={(e) => setApiKeyState(e.target.value)}
            type="password"
          />
          <p className="text-xs text-muted-foreground">
            Don't have an API key? Get one at{' '}
            <a
              href="https://openrouter.ai/keys"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              openrouter.ai
            </a>
          </p>
        </div>
        <DialogFooter>
          <Button onClick={handleSave} disabled={!apiKey.trim()}>
            Save API Key
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 