import { STEPS } from "@/lib/steps/steps"
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@workspace/ui/components/progress"

export const dynamicParams = false

export async function generateStaticParams(): Promise<StaticParams[]> {
  const params = STEPS as StaticParams[]
  return params
}

export interface StaticParams {
  stepName: string
}

export default async function Layout({
  params,
  children,
}: {
  params: Promise<StaticParams>
  children: React.ReactNode
}) {
  const { stepName } = await params
  const { boosts } = STEPS[Number(stepName) - 1]!
  return (
    <main className="flex h-svh flex-col">
      <header className="shrink-0 p-4">
        <Progress
          value={(100 * (Number(stepName) - 1)) / STEPS.length}
          max={100}
        >
          <ProgressLabel>
            <span>Step: {stepName}</span>
            <span className="ml-4">
              {boosts[0]}～{boosts[boosts.length - 1]}
            </span>
          </ProgressLabel>
          <ProgressValue />
        </Progress>
      </header>
      <div className="min-h-0 flex-1">{children}</div>
    </main>
  )
}
