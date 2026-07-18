"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { createWorker, PSM, type Worker } from "tesseract.js"

export interface OCRState {
  data: Tesseract.Page | null
  progress: number
  loading: boolean
  error: Error | null
  ready: boolean
}

const initialState: OCRState = {
  data: null,
  progress: 0,
  loading: false,
  error: null,
  ready: false,
}

export function useOCR() {
  const [state, setState] = useState<OCRState>(initialState)

  const workerRef = useRef<Worker | null>(null)
  const workerPromise = useRef<Promise<Worker> | null>(null)

  const requestId = useRef(0)

  useEffect(() => {
    let mounted = true

    workerPromise.current = (async () => {
      const worker = await createWorker("eng", 1, {
        logger: (m) => {
          if (m.status === "recognizing text") {
            setState((prev) => ({
              ...prev,
              progress: m.progress,
            }))
          }
        },
      })

      await worker.setParameters({
        tessedit_pageseg_mode: PSM.SINGLE_BLOCK,
      })

      workerRef.current = worker

      if (mounted) {
        setState((prev) => ({
          ...prev,
          ready: true,
        }))
      }

      return worker
    })()

    return () => {
      mounted = false

      if (workerRef.current) {
        workerRef.current.terminate()
        workerRef.current = null
      }
    }
  }, [])

  const recognize = useCallback(async (image: File | Blob | string) => {
    const id = ++requestId.current

    setState((prev) => ({
      ...prev,
      loading: true,
      progress: 0,
      error: null,
      data: null,
    }))

    try {
      if (!workerPromise.current) {
        throw new Error("Worker is not initialized.")
      }

      const worker = await workerPromise.current

      const { data } = await worker.recognize(
        image,
        {},
        {
          blocks: true,
        }
      )

      if (id !== requestId.current) {
        return
      }

      setState((prev) => ({
        ...prev,
        loading: false,
        progress: 1,
        data,
      }))
    } catch (err) {
      if (id !== requestId.current) {
        return
      }

      setState((prev) => ({
        ...prev,
        loading: false,
        error: err instanceof Error ? err : new Error("OCR failed"),
      }))
    }
  }, [])

  const reset = useCallback(() => {
    requestId.current++

    setState((prev) => ({
      ...prev,
      data: null,
      progress: 0,
      loading: false,
      error: null,
    }))
  }, [])

  return {
    ...state,
    recognize,
    reset,
  }
}
