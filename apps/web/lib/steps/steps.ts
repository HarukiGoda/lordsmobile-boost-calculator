import { BOOSTS_INFO } from "../boost/boosts"
import { StaticParams } from "@/app/step/[stepName]/layout"

export interface StepProps extends StaticParams {
  readonly stepName: string
  readonly step: number
  readonly stepType: "upload" | "crop" | "ocr"
  readonly boosts: (typeof BOOSTS_INFO)[number]
}

const STEP_TYPES = ["upload", "crop", "ocr"] as const

export const STEPS = BOOSTS_INFO.flatMap((group, boostIndex) =>
  STEP_TYPES.map((type, typeIndex) => ({
    stepName: (boostIndex * 3 + typeIndex + 1).toString(),
    step: boostIndex * 3 + typeIndex + 1,
    stepType: type,
    boosts: group,
  }))
) satisfies readonly StepProps[]
