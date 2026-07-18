import { BOOSTS } from "../boost/boosts"
import { type BoostName } from "../boost/types"
import { StaticParams } from "@/app/step/[stepName]/layout"

export interface StepProps extends StaticParams {
  // stepName: string
  step: number // number(stepName)
  stepType: "upload" | "crop" | "ocr"
  boosts: readonly BoostName[]
}

export const STEPS: StepProps[] = [
  {
    stepName: "1",
    step: 1,
    stepType: "upload",
    boosts: BOOSTS[0]!,
  },
  {
    stepName: "2",
    step: 2,
    stepType: "crop",
    boosts: BOOSTS[0]!,
  },
  {
    stepName: "3",
    step: 3,
    stepType: "ocr",
    boosts: BOOSTS[0]!,
  },
  {
    stepName: "4",
    step: 4,
    stepType: "upload",
    boosts: BOOSTS[1]!,
  },
  {
    stepName: "5",
    step: 5,
    stepType: "crop",
    boosts: BOOSTS[1]!,
  },
  {
    stepName: "6",
    step: 6,
    stepType: "ocr",
    boosts: BOOSTS[1]!,
  },
  {
    stepName: "7",
    step: 7,
    stepType: "upload",
    boosts: BOOSTS[2]!,
  },
  {
    stepName: "8",
    step: 8,
    stepType: "crop",
    boosts: BOOSTS[2]!,
  },
  {
    stepName: "9",
    step: 9,
    stepType: "ocr",
    boosts: BOOSTS[2]!,
  },
  {
    stepName: "10",
    step: 10,
    stepType: "upload",
    boosts: BOOSTS[3]!,
  },
  {
    stepName: "11",
    step: 11,
    stepType: "crop",
    boosts: BOOSTS[3]!,
  },
  {
    stepName: "12",
    step: 12,
    stepType: "ocr",
    boosts: BOOSTS[3]!,
  },
] as const
