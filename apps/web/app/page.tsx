import Link from "next/link"
import { buttonVariants } from "@workspace/ui/components/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Separator } from "@workspace/ui/components/separator"
import { Calculator, Crop, ShieldAlert, Sparkles, Upload } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    default: "ロードモバイル ブースト計算ツール",
    template: "%s | ロードモバイル ブースト計算ツール",
  },
  other: {
    "google-adsense-account": "ca-pub-8070114679956530",
  },

  description:
    "ロードモバイル（ローモバ）のスクリーンショットから戦闘ブースト値や総合値を自動計算。手入力不要、画像認識で正確な数値を算出できる無料の攻略ツールです。",
  keywords: [
    "ロードモバイル",
    "ローモバ",
    "ブースト",
    "ツール",
    "ブースト計算",
    "総合値",
    "攻略",
    "画像認識",
    "自動",
    "スクリーンショット",
    "スクショ",
  ],
}

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col bg-background text-foreground">
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center gap-6 px-4 py-16 text-center md:py-24">
        <div className="inline-flex items-center gap-2 rounded-full border bg-muted/50 px-3 py-1 text-xs text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          <span>画像認識でブーストを自動計算</span>
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight text-balance sm:text-5xl md:text-6xl">
          Lordsmobile <br className="sm:hidden" />
          <span className="bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Boost Calculator
          </span>
        </h1>

        <p className="max-w-2xl leading-relaxed text-balance text-muted-foreground sm:text-xl">
          スクリーンショットをアップロードするだけで、通常時やロード出陣時の戦闘ブースト値・総合値を自動で解析・計算します。手入力の手間はもう必要ありません。
        </p>

        <div className="flex w-full flex-col justify-center gap-4 pt-4 sm:w-auto sm:flex-row">
          <Link
            href="/step/1"
            className={cn(buttonVariants({ size: "lg" }), "px-8")}
          >
            ブーストを計算する
          </Link>
        </div>

        <Separator className="my-12 w-full max-w-2xl" />

        <div className="w-full">
          <h2 className="mb-8 text-xl font-bold tracking-tight">
            計算はわずか 3 ステップ
          </h2>
          <div className="grid gap-6 text-left md:grid-cols-3">
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <div className="mb-2 w-fit rounded-lg bg-blue-500/10 p-2 text-blue-600">
                  <Upload className="h-5 w-5" />
                </div>
                <CardTitle className="text-base">1. 画像アップロード</CardTitle>
                <CardDescription>
                  ゲーム内のブースト画面のスクリーンショットを選択します。
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <div className="mb-2 w-fit rounded-lg bg-cyan-500/10 p-2 text-cyan-600">
                  <Crop className="h-5 w-5" />
                </div>
                <CardTitle className="text-base">2. トリミング</CardTitle>
                <CardDescription>
                  誤認識を防ぐため、解析したい数値のエリアだけを綺麗に囲みます。
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <div className="mb-2 w-fit rounded-lg bg-green-500/10 p-2 text-green-600">
                  <Calculator className="h-5 w-5" />
                </div>
                <CardTitle className="text-base">3. 自動計算・解析</CardTitle>
                <CardDescription>
                  システムが文字を自動認識し、あなたの現在の軍事ブーストを出力します。
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

        <div className="mt-8 flex w-full max-w-2xl items-start gap-3 rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-4 text-left text-sm leading-relaxed text-muted-foreground">
          <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-yellow-600" />
          <div>
            <span className="mb-0.5 block font-semibold text-foreground">
              認識のコツ
            </span>
            文字が背景と同化して読みづらい場合は、トリミング後のステップで明るさの閾値（しきい値）を調整すると、数字がくっきり浮き出て認識率が大幅にアップします。
          </div>
        </div>
      </main>

      <footer className="border-t bg-muted/20 py-6 text-center text-xs text-muted-foreground">
        <div className="mb-2 space-x-4">
          <Link href="/privacy" className="hover:underline">
            プライバシーポリシー
          </Link>
        </div>
        <p>
          © {new Date().getFullYear()} Lordsmobile Boost Calculator. All rights
          reserved.
        </p>
      </footer>
    </div>
  )
}
