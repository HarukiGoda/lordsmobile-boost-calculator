import { use } from "react"
import { ImgUpdateContext } from "@/contexts/image/img-provider"

export function useSetImg() {
  const setFile = use(ImgUpdateContext)
  if (setFile === undefined) {
    throw new Error("useSetImg must be used within a ImgContextProvider")
  }
  return setFile
}
