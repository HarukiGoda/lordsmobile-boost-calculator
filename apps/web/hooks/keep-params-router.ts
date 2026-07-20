"use client"

import { useSearchParams, useRouter } from "next/navigation"

export function useKeepParamsRouter() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const getNewPath = (path: string, newParams: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString())
    Object.entries(newParams).forEach(([key, value]) => {
      params.set(key, value)
    })
    return `${path}?${params.toString()}`
  }

  const push = (path: string) => {
    const query = searchParams.toString()
    router.push(query ? `${path}?${query}` : path)
  }

  const replace = (path: string) => {
    const query = searchParams.toString()
    router.replace(query ? `${path}?${query}` : path)
  }

  // 特定のパラメータを上書きして遷移するメソッド
  const updateAndPush = (path: string, newParams: Record<string, string>) => {
    router.push(getNewPath(path, newParams))
  }

  const updateAndReplace = (
    path: string,
    newParams: Record<string, string>
  ) => {
    router.replace(getNewPath(path, newParams))
  }

  return { push, replace, updateAndPush, updateAndReplace }
}
