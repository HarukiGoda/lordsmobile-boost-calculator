"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import ReactCrop, { centerCrop, Crop } from "react-image-crop"
import "react-image-crop/dist/ReactCrop.css"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog"
import { Label } from "@workspace/ui/components/label"
import { Slider } from "@workspace/ui/components/slider"
import { useObjectUrl } from "@/hooks/object-url"
import { cn } from "@workspace/ui/lib/utils"

const thresholdBrightness = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  threshold: number
) => {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const data = imageData.data

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i] ?? 0
    const g = data[i + 1] ?? 0
    const b = data[i + 2] ?? 0

    const brightness = 0.299 * r + 0.587 * g + 0.114 * b

    if (brightness > threshold) {
      data[i] = 255
      data[i + 1] = 255
      data[i + 2] = 255
    } else {
      data[i] = 0
      data[i + 1] = 0
      data[i + 2] = 0
    }
  }

  ctx.putImageData(imageData, 0, 0)
}

export interface ImageCropperProps {
  img: File | Blob | null
  onCropComplete?: (croppedBlob: Blob) => void
  className?: string
  triggerCropRef: React.RefObject<(() => Promise<void>) | null>
}

export function ImageCropper({
  img,
  onCropComplete,
  className,
  triggerCropRef,
}: ImageCropperProps) {
  const [crop, setCrop] = useState<Crop>()
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [brightness, setBrightness] = useState(110)

  const originalSrc = useObjectUrl(img)
  const [processedSrc, setProcessedSrc] = useState<string | null>(null)
  const originalImgRef = useRef<HTMLImageElement | null>(null)
  const processedImgRef = useRef<HTMLImageElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)

  useEffect(() => {
    canvasRef.current = document.createElement("canvas")
    ctxRef.current = canvasRef.current.getContext("2d", {
      willReadFrequently: true,
    })
  }, [])

  const regenerateImage = useCallback(
    (image: HTMLImageElement, threshold: number) => {
      if (image.naturalWidth === 0 || image.naturalHeight === 0) return

      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = ctxRef.current
      if (!ctx) return

      canvas.width = image.naturalWidth
      canvas.height = image.naturalHeight

      ctx.drawImage(image, 0, 0)

      thresholdBrightness(canvas, ctx, threshold)

      setProcessedSrc(canvas.toDataURL("image/png"))
    },
    []
  )

  const handleOriginalImageLoad = (
    e: React.SyntheticEvent<HTMLImageElement>
  ) => {
    const image = e.currentTarget
    originalImgRef.current = image

    regenerateImage(e.currentTarget, brightness)
  }

  const handleCrop = useCallback(async () => {
    const image = processedImgRef.current

    if (!image || !crop || !crop.width || !crop.height) {
      setIsAlertOpen(true)
      return
    }

    const sourceCanvas = canvasRef.current

    if (!sourceCanvas) return

    const cropCanvas = document.createElement("canvas")
    const ctx = cropCanvas.getContext("2d")

    if (!ctx) return
    const imageRatio = image.naturalWidth / image.naturalHeight
    const elementRatio = image.width / image.height

    let actualRenderedWidth = image.width
    let actualRenderedHeight = image.height

    if (elementRatio > imageRatio) {
      actualRenderedWidth = image.height * imageRatio
    } else {
      actualRenderedHeight = image.width / imageRatio
    }
    const scaleX = image.naturalWidth / actualRenderedWidth
    const scaleY = image.naturalHeight / actualRenderedHeight

    const xOffset = (image.width - actualRenderedWidth) / 2
    const yOffset = (image.height - actualRenderedHeight) / 2
    const targetX = (crop.x - xOffset) * scaleX
    const targetY = (crop.y - yOffset) * scaleY
    const targetWidth = crop.width * scaleX
    const targetHeight = crop.height * scaleY
    cropCanvas.width = targetWidth
    cropCanvas.height = targetHeight

    ctx.imageSmoothingQuality = "high"

    ctx.drawImage(
      sourceCanvas,
      targetX,
      targetY,
      targetWidth,
      targetHeight,
      0,
      0,
      targetWidth,
      targetHeight
    )

    return new Promise<void>((resolve) => {
      cropCanvas.toBlob(
        (blob) => {
          if (blob) {
            onCropComplete?.(blob)
          }

          resolve()
        },
        "image/jpeg",
        0.9
      )
    })
  }, [crop, onCropComplete])

  useEffect(() => {
    triggerCropRef.current = handleCrop
  }, [handleCrop, triggerCropRef])

  const handleSliderChange = (value: number | readonly number[]) => {
    const threshold = Array.isArray(value) ? value[0]! : value

    setBrightness(threshold)
    if (originalImgRef.current) {
      regenerateImage(originalImgRef.current, threshold)
    }
  }

  const handleProcessedImageLoad = (
    e: React.SyntheticEvent<HTMLImageElement>
  ) => {
    const image = e.currentTarget

    if (crop === undefined) {
      const initialCrop = centerCrop(
        {
          unit: "%",
          width: 25,
          height: 70,
        },
        image.width,
        image.height
      )

      setCrop(initialCrop)
    }

    processedImgRef.current = image
  }
  return (
    <div className={cn("flex h-full w-full flex-col", className)}>
      {originalSrc && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          ref={originalImgRef}
          src={originalSrc ?? ""}
          className="absolute hidden"
          onLoad={handleOriginalImageLoad}
          alt=""
        />
      )}

      {processedSrc && (
        <div className="mx-auto flex w-full max-w-xs shrink-0 flex-col gap-3">
          <div className="flex items-center justify-between gap-2">
            <Label htmlFor="slider-brightness">明るさ閾値</Label>
            <span className="text-sm text-muted-foreground">{brightness}</span>
          </div>

          <Slider
            id="slider-brightness"
            value={[brightness]}
            onValueChange={handleSliderChange}
            min={0}
            max={255}
            step={1}
          />
        </div>
      )}
      {processedSrc && (
        <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden">
          <ReactCrop crop={crop} onChange={setCrop}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={processedImgRef}
              src={processedSrc}
              onLoad={handleProcessedImageLoad}
              alt=""
              className="block h-[40vh] max-w-full object-contain lg:h-[80vh]"
            />
          </ReactCrop>
        </div>
      )}

      <Dialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>切り取り範囲を選択してください</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}
