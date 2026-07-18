"use client"

import { useSearchParams } from "next/navigation"
import { useCallback } from "react"
import { decodeBoosts } from "@/lib/codec/boost-codec"

export function useBoostsParam() {
  const searchParams = useSearchParams()

  const getBoosts = useCallback(async () => {
    const value = searchParams.get("boosts")

    if (!value) return null

    return decodeBoosts(value)
  }, [searchParams])

  return getBoosts
}
