"use client"

import { useSearchParams, useRouter } from "next/navigation"

export function useKeepParamsRouter() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const push = (path: string) => {
    const query = searchParams.toString()
    router.push(query ? `${path}?${query}` : path)
  }

  return { push }
}
