"use client"

import { useKeepParamsRouter } from "@/hooks/keep-params-router"
import { STEPS } from "@/lib/steps/steps"
import { Button } from "@workspace/ui/components/button"

export interface StepButtonProps {
  nextStep: number
  variant?:
    "default" | "secondary" | "destructive" | "outline" | "ghost" | "link"
  children?: React.ReactNode
  disabled?: boolean
  updateParams?: Record<string, string>
  className?: string
}

export function NextStepButton({
  nextStep,
  children,
  disabled,
  updateParams = {}, // デフォルトは空オブジェクト
  className,
  variant,
}: StepButtonProps) {
  const { updateAndPush } = useKeepParamsRouter()

  return (
    <Button
      size="lg"
      className={className}
      disabled={disabled}
      variant={variant}
      onClick={async () => {
        const path =
          nextStep > STEPS[STEPS.length - 1]!.step
            ? "/result"
            : `/step/${nextStep}`

        updateAndPush(path, updateParams)
      }}
    >
      {children}
    </Button>
  )
}
