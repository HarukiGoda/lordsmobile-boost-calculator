import { CropImagePage } from "./crop-image"
import { OcrImagePage } from "./ocr-image"
import { UploadImagePage } from "./upload-image"
import { notFound } from "next/navigation"
import { STEPS, StepProps } from "@/lib/steps/steps"
import { StaticParams } from "@/app/step/[stepName]/layout"

export default async function Page({
  params,
}: {
  params: Promise<StaticParams>
}) {
  const p: StepProps = STEPS[Number((await params).stepName) - 1]!

  switch (p.stepType) {
    case "upload":
      return <UploadImagePage {...p} />
    case "crop":
      return <CropImagePage {...p} />
    case "ocr":
      return <OcrImagePage {...p} />
    default:
      notFound()
  }
}
