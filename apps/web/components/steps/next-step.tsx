"use client"

import { useKeepParamsRouter } from "@/hooks/keep-params-router"
import { useBoostsParam } from "@/hooks/use-boosts-param"
import { Boost } from "@/lib/boost/types"
import { encodeBoosts } from "@/lib/codec/boost-codec"
import { STEPS } from "@/lib/steps/steps"
import { Button } from "@workspace/ui/components/button"
import { useRouter } from "next/navigation"

export interface StepKeepParamButtonProps {
  variant?:
    "default" | "secondary" | "destructive" | "outline" | "ghost" | "link"
  nextStep: number
  className?: string
  children?: React.ReactNode
  disabled?: boolean
}

export interface StepButtonProps extends StepKeepParamButtonProps {
  additionalBoosts: Boost[]
}

// Must be used in Suspense
export function NextStepKeepParamButton({
  variant,
  className,
  nextStep,
  children,
  disabled,
}: StepKeepParamButtonProps) {
  const router = useKeepParamsRouter()

  return (
    <Button
      size="lg"
      variant={variant}
      className={className}
      onClick={() => {
        if (nextStep > STEPS[STEPS.length - 1]!.step) {
          router.push("/result")
        } else {
          router.push(`/step/${nextStep}`)
        }
      }}

      disabled={disabled}
    >
      {children}
    </Button>
  )
}

// Must be used in Suspense
export function NextStepButton({
  nextStep,
  children,
  disabled,
  additionalBoosts,
  className,
}: StepButtonProps) {
  const router = useRouter()
  const current = useBoostsParam()

  return (
    <Button
      size="lg"
      className={className}
      disabled={disabled}
      onClick={async () => {
        if (nextStep > STEPS[STEPS.length - 1]!.step) {
          const c = await current()
          const p = c ? [...c, ...additionalBoosts] : additionalBoosts
          router.push(`/result?boosts=${await encodeBoosts(p)}`)
        } else {
          const c = await current()
          const p = c ? [...c, ...additionalBoosts] : additionalBoosts
          router.push(`/step/${nextStep}?boosts=${await encodeBoosts(p)}`)
        }
      }}
    >
      {children}
    </Button>
  )
}
