"use client"

import { StepProps } from "@/lib/steps/steps"
import { ImageCropper } from "@/components/image/image-cropper"
import { useImg } from "@/hooks/image/use-img"
import { useSetImg } from "@/hooks/image/use-set-img"
import { Suspense, useRef } from "react"
import { Button } from "@workspace/ui/components/button"
import { useKeepParamsRouter } from "@/hooks/keep-params-router"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog"
import Image from "next/image"
import { InfoIcon } from "lucide-react"
import { PrevStepButton } from "@/components/steps/prev-step"
import { Separator } from "@workspace/ui/components/separator"
import croppingSample from "@/public/cropping-sample.png"

function CropActions({
  step,
  triggerCropRef,
}: {
  step: number
  triggerCropRef: React.RefObject<(() => Promise<void>) | null>
}) {
  const img = useImg()
  const handleCropTrigger = async () => {
    if (triggerCropRef.current) {
      await triggerCropRef.current()
    }
  }

  return (
    <>
      <PrevStepButton nextStep={step - 1}>画像の選択に戻る</PrevStepButton>
      <Button size="lg" onClick={handleCropTrigger} disabled={!img}>
        次へ
      </Button>
    </>
  )
}

function ActiveImageCropper({
  step,
  triggerCropRef,
}: {
  step: number
  triggerCropRef: React.RefObject<(() => Promise<void>) | null>
}) {
  const img = useImg()
  const setImage = useSetImg()
  const router = useKeepParamsRouter()

  return (
    <ImageCropper
      className="h-full w-full"
      img={img}
      triggerCropRef={triggerCropRef}
      onCropComplete={(f) => {
        setImage(f)
        router.push(`/step/${step + 1}`)
      }}
    />
  )
}

export function CropImagePage({ step }: StepProps) {
  const triggerCropRef = useRef<(() => Promise<void>) | null>(null)

  return (
    <div className="flex flex-col gap-4 p-2 lg:grid lg:h-full lg:grid-cols-12 lg:p-0">
      <Card className="relative z-20 col-span-12 my-auto shrink-0 justify-center bg-background lg:col-span-3">
        <CardHeader>
          <CardTitle>Step: {step} 画像のトリミング</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          <Dialog>
            <DialogTrigger
              render={
                <Button variant="ghost" className="flex items-center gap-2">
                  <InfoIcon />
                  トリミング例を見る
                </Button>
              }
            />
            <DialogContent>
              <DialogHeader>
                <DialogTitle>トリミング例</DialogTitle>
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
          <p className="mt-4">
            通常時・ロード出陣時のブースト値のみを囲んでください。
          </p>
          <p>
            文字が読みづらい場合は、
            明るさ閾値を調整すると認識しやすくなります。
          </p>
        </CardContent>

        <CardFooter className="relative z-30 flex min-h-15 justify-around">
          <Suspense
            fallback={
              <span className="text-sm text-muted-foreground">Loading...</span>
            }
          >
            <CropActions step={step} triggerCropRef={triggerCropRef} />
          </Suspense>
        </CardFooter>
      </Card>

      <Separator orientation="vertical" className="hidden h-full lg:block" />
      <Separator orientation="horizontal" className="w-full lg:hidden" />

      <div className="relative z-10 col-span-12 flex h-auto max-h-[50vh] min-h-0 flex-col overflow-hidden rounded-lg border lg:col-span-8 lg:h-full lg:max-h-none">
        <Suspense
          fallback={
            <div className="flex h-full min-h-50 w-full items-center justify-center rounded-lg border border-dashed bg-muted/20">
              エディタを起動中...
            </div>
          }
        >
          <ActiveImageCropper step={step} triggerCropRef={triggerCropRef} />
        </Suspense>
      </div>
    </div>
  )
}
