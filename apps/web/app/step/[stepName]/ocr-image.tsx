"use client"

import { useEffect, useMemo, Suspense } from "react"
import Image from "next/image"

import { StepProps } from "@/lib/steps/steps"
import { useOCR } from "@/hooks/ocr"
import { useImg } from "@/hooks/image/use-img"
import { useObjectUrl } from "@/hooks/object-url"
import { parseBoostOCR } from "@/lib/ocr/parser"
import { Separator } from "@workspace/ui/components/separator"
import { Card, CardContent, CardFooter } from "@workspace/ui/components/card"
import {
  LeftCardActions,
  OcrResultSection,
} from "@/components/ocr-image/dynamic"

export function OcrImagePage({ step, boosts }: StepProps) {
  const { recognize, data, loading, error } = useOCR()
  const img = useImg()
  const imgUrl = useObjectUrl(img)

  const parsedBoosts = useMemo(
    () => (data ? parseBoostOCR(data.text, boosts) : []),
    [data, boosts]
  )

  useEffect(() => {
    if (!img) return
    void recognize(img)
  }, [img, recognize])

  return (
    <div className="grid h-full grid-cols-12 gap-4 pb-4">
      <Card className="col-span-12 row-span-2 grid h-full grid-rows-subgrid items-center lg:col-span-5">
        <CardContent className="h-full min-h-0 w-full">
          {imgUrl && (
            <Image
              src={imgUrl}
              alt="OCR Target"
              width={0}
              height={0}
              className="aspect-auto h-auto max-h-full w-full rounded-lg border object-contain shadow-sm"
              unoptimized
            />
          )}
          {error && (
            <div className="mt-2 text-sm text-destructive">
              <p>画像の解析中にエラーが発生しました！</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex h-full min-h-15 justify-around">
          <Suspense
            fallback={
              <span className="text-sm text-muted-foreground">Loading...</span>
            }
          >
            <LeftCardActions
              step={step}
              loading={loading}
              img={img}
              onReanalyze={() => img && recognize(img)}
            />
          </Suspense>
        </CardFooter>
      </Card>

      <div className="flex w-full items-center justify-center lg:row-span-2">
        <Separator orientation="vertical" className="hidden h-full lg:block" />
        <Separator orientation="horizontal" className="lg:hidden" />
      </div>

      <Suspense
        fallback={
          <Card className="col-span-12 row-span-2 animate-pulse bg-muted/10 lg:col-span-6">
            <CardContent className="h-32" />
          </Card>
        }
      >
        <OcrResultSection
          step={step}
          loading={loading}
          parsedBoosts={parsedBoosts}
        />
      </Suspense>
    </div>
  )
}
