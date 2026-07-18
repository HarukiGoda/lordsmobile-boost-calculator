"use client"

import { useKeepParamsRouter } from "@/hooks/keep-params-router"
import { StepKeepParamButtonProps } from "./next-step"
import { STEPS } from "@/lib/steps/steps"
import { Button } from "@workspace/ui/components/button"

// Must be used in Suspense
export function PrevStepButton({
  className,
  nextStep,
  children,
  disabled,
}: StepKeepParamButtonProps) {
  const router = useKeepParamsRouter()
  return (
    <Button
      size="lg"
      className={className}
      onClick={() => {
        console.log(nextStep)
        if (nextStep < STEPS[0]!.step) return
        router.push(`/step/${nextStep}`)
      }}
      variant="secondary"
      disabled={disabled || nextStep < STEPS[0]!.step}
    >
      {children}
    </Button>
  )
}
