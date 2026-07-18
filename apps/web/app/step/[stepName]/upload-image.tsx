"use client"

import Image from "next/image"
import { ImageInput } from "@/components/image/image-input"
import { useImg } from "@/hooks/image/use-img"
import { useSetImg } from "@/hooks/image/use-set-img"
import { StepProps } from "@/lib/steps/steps"
import { useObjectUrl } from "@/hooks/object-url"
import { NextStepKeepParamButton } from "@/components/steps/next-step"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { useEffect, Suspense } from "react"
import { Separator } from "@workspace/ui/components/separator"

function DynamicFooterAction({
  step,
  disabled,
}: {
  step: number
  disabled: boolean
}) {
  return (
    <NextStepKeepParamButton
      nextStep={step + 1}
      disabled={disabled}
      className="mx-auto w-fit"
    >
      次へ
    </NextStepKeepParamButton>
  )
}

export function UploadImagePage({ step, boosts }: StepProps) {
  const img = useImg()
  const setImage = useSetImg()
  const imgUrl = useObjectUrl(img)

  useEffect(() => {
    setImage(null)
  }, [setImage])

  return (
    <div className="flex min-h-full flex-col gap-4 p-2 lg:grid lg:h-full lg:grid-cols-12 lg:p-0">
      <Card className="relative z-20 flex h-fit shrink-0 flex-col bg-background lg:col-span-3 lg:my-auto">
        <CardHeader>
          <CardTitle>Step {step}: 画像をアップロード</CardTitle>
        </CardHeader>
        <CardContent>
          <ImageInput
            onFileChange={setImage}
            label={""}
            description={`${boosts[0]}～${boosts[boosts.length - 1]}が含まれている画像をアップロードしてください。`}
          />
        </CardContent>
        <CardFooter className="relative z-30 flex min-h-15 items-center justify-center">
          <Suspense
            fallback={
              <span className="animate-pulse text-sm text-muted-foreground">
                読み込み中...
              </span>
            }
          >
            <DynamicFooterAction step={step} disabled={!img} />
          </Suspense>
        </CardFooter>
      </Card>

      <Separator orientation="vertical" className="hidden h-full lg:block" />
      <Separator orientation="horizontal" className="w-full lg:hidden" />

      <div className="relative z-10 flex h-auto min-h-0 w-full items-center justify-center overflow-hidden lg:col-span-8 lg:my-auto lg:h-full">
        {imgUrl && (
          <div className="max-h-[50vh] w-full object-contain lg:max-h-full">
            <Image
              src={imgUrl}
              width={800}
              height={600}
              alt="inputted image"
              className="aspect-auto h-auto max-h-[50vh] w-full rounded-lg border object-contain shadow-sm lg:max-h-full"
              unoptimized
            />
          </div>
        )}
      </div>
    </div>
  )
}
