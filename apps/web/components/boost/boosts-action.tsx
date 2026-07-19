"use client"

import { boostsToTSV } from "@/lib/boost/tsv"
import { Boost, TsvKey } from "@/lib/boost/types"
import { Button } from "@workspace/ui/components/button"
import { CopyIcon, Share2Icon } from "lucide-react"
import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import { cn } from "@workspace/ui/lib/utils"

export interface BoostsActionsProps {
  boosts: Boost[]
  className?: string
}

const buttons = [
  { key: "name", label: "ヘッダー" },
  { key: "noLord", label: "通常時" },
  { key: "withLord", label: "ロード出陣時" },
] satisfies {
  key: TsvKey
  label: string
}[]

export function BoostsActions({ boosts, className }: BoostsActionsProps) {
  const [copied, setCopied] = useState<boolean>(false)

  async function handleCopy(key: TsvKey) {
    await navigator.clipboard.writeText(boostsToTSV(boosts, key))

    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 1500)
  }

  return (
    <div className={cn("flex gap-2", className)}>
      <Button
        variant="outline"
        size="icon"
        onClick={() => navigator.share({ url: document.URL })}
      >
        <Share2Icon />
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="outline" />}>
          {copied ? (
            "Copied!"
          ) : (
            <>
              <CopyIcon />
              シート用コピー
            </>
          )}
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          {buttons.map((btn) => (
            <DropdownMenuItem key={btn.key} onClick={() => handleCopy(btn.key)}>
              {btn.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
