"use client"

import { useKeepParamsRouter } from "@/hooks/keep-params-router"
import { STEPS } from "@/lib/steps/steps"
import { Button } from "@workspace/ui/components/button"

export interface StepKeepParamButtonProps {
  variant?:
    "default" | "secondary" | "destructive" | "outline" | "ghost" | "link"
  nextStep: number
  className?: string
  children?: React.ReactNode
  disabled?: boolean
  updateParams?: Record<string, string> // 汎用的に変更
}

export function PrevStepButton({
  className,
  nextStep,
  children,
  disabled,
  updateParams = {},
}: StepKeepParamButtonProps) {
  const { updateAndPush } = useKeepParamsRouter()

  return (
    <Button
      size="lg"
      variant="secondary"
      className={className}
      disabled={disabled || nextStep < STEPS[0]!.step}
      onClick={() => {
        if (nextStep < STEPS[0]!.step) return

        // 遷移先を決めてパラメータをマージしてプッシュ
        updateAndPush(`/step/${nextStep}`, updateParams)
      }}
    >
      {children}
    </Button>
  )
}
