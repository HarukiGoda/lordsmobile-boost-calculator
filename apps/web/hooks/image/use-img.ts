"use client"

import { use } from "react"
import { ImgContext } from "@/contexts/image/img-provider"

export function useImg() {
  const file = use(ImgContext)
  if (file === undefined) {
    throw new Error("useFile must be used within a ImgContextProvider")
  }
  return file
}
