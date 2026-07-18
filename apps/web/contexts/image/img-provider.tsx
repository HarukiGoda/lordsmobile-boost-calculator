"use client"

import { createContext, useState } from "react"

export const ImgContext = createContext<File | Blob | null | undefined>(
  undefined
)
export const ImgUpdateContext = createContext<
  React.Dispatch<React.SetStateAction<File | Blob | null>>
>(() => {})

export function ImgProvider({ children }: { children: React.ReactNode }) {
  const [img, setImage] = useState<File | Blob | null>(null)

  return (
    <ImgContext.Provider value={img}>
      <ImgUpdateContext.Provider value={setImage}>
        {children}
      </ImgUpdateContext.Provider>
    </ImgContext.Provider>
  )
}
