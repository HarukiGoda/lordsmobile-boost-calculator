"use client"

import { useEffect, useState, useMemo, Suspense } from "react"
import Image from "next/image"

import { StepProps } from "@/lib/steps/steps"
import { useOCR } from "@/hooks/ocr"
import { useImg } from "@/hooks/image/use-img"
import { useObjectUrl } from "@/hooks/object-url"

import { Button } from "@workspace/ui/components/button"
import { EditableBoostsTable } from "@/components/boost/editable-boosts-table"
import { EditableBoost } from "@/lib/boost/types"
import { normalizeBoost } from "@/lib/boost/normalize"
import { parseBoostOCR } from "@/lib/ocr/parser"
import { NextStepButton } from "@/components/steps/next-step"
import { Separator } from "@workspace/ui/components/separator"
import { Card, CardContent, CardFooter } from "@workspace/ui/components/card"
import { PrevStepButton } from "@/components/steps/prev-step"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog"
import { InfoIcon } from "lucide-react"
import croppingSample from "@/public/cropping-sample.png"

function LeftCardActions({
  step,
  loading,
  img,
  onReanalyze,
}: {
  step: number
  loading: boolean
  img: File | Blob | null
  onReanalyze: () => void
}) {
  return (
    <>
      <PrevStepButton nextStep={step - 2}>画像の選択に戻る</PrevStepButton>
      <Button size="lg" onClick={onReanalyze} disabled={loading || !img}>
        {loading ? "Analyzing..." : "画像を再解析"}
      </Button>
    </>
  )
}

function OcrResultSection({
  step,
  loading,
  parsedBoosts,
}: {
  step: number
  loading: boolean
  parsedBoosts: EditableBoost[]
}) {
  const [boostsState, setBoostsState] = useState<EditableBoost[]>([])
  const currentBoosts = boostsState.length > 0 ? boostsState : parsedBoosts

  return (
    <Card className="col-span-12 row-span-2 grid grid-rows-subgrid lg:col-span-6">
      <CardContent>
        {!loading ? (
          <EditableBoostsTable
            key={parsedBoosts.map((b) => b.boost.name).join()}
            initialBoosts={currentBoosts}
            onChange={setBoostsState}
          />
        ) : (
          <div className="flex h-32 items-center justify-center text-sm text-muted-foreground">
            テキストを解析中...
          </div>
        )}
      </CardContent>
      <CardFooter className="flex items-center justify-around">
        <Dialog>
          <DialogTrigger
            render={
              <Button size="lg" variant="ghost">
                <InfoIcon />
                読み取りがうまくいかない時は...
              </Button>
            }
          />
          <DialogContent>
            <DialogHeader>
              <DialogTitle>読み取りのコツ</DialogTitle>
              <DialogDescription>
                ブースト値以外の物が含まれないようにしてください
              </DialogDescription>
            </DialogHeader>
            <Image
              src={croppingSample}
              alt="cropping-sample"
              className="mx-auto"
            />
          </DialogContent>
        </Dialog>
        <NextStepButton
          nextStep={step + 1}
          disabled={loading || currentBoosts.length === 0}
          additionalBoosts={currentBoosts.map((b) => normalizeBoost(b))}
        >
          次へ
        </NextStepButton>
      </CardFooter>
    </Card>
  )
}

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
