"use client"

import { useState, Suspense, startTransition } from "react"
import type { EditableBoost } from "@/lib/boost/types"
import { normalizeBoost } from "@/lib/boost/normalize"
import { ScrollArea, ScrollBar } from "@workspace/ui/components/scroll-area"
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Badge } from "@workspace/ui/components/badge"
import { encodeBoosts } from "@/lib/codec/boost-codec"
import { BOOSTS_INFO } from "@/lib/boost/boosts"
import { buttonVariants } from "@workspace/ui/components/button"
import Link from "next/link"
import { cn } from "@workspace/ui/lib/utils"
import {
  DynamicActions,
  DynamicTableContainer,
  DynamicTotal,
} from "@/components/result/dynamic"
import { DynamicPreference } from "@/components/result/dynamic-preference"

export default function Page() {
  const [boosts, setBoosts] = useState<EditableBoost[] | null>(null)
  const [isWonderActive, setIsWonderActive] = useState(true)

  // 統合された変更ハンドラ
  const handleDataChange = (
    newData: EditableBoost[] | ((prev: EditableBoost[]) => EditableBoost[])
  ) => {
    // 関数型更新に対応（DynamicPreference での加算・減算処理を想定）
    const nextBoosts =
      typeof newData === "function" ? newData(boosts ?? []) : newData

    startTransition(() => {
      // BOOSTS_INFO に基づく正規化処理
      setBoosts(
        BOOSTS_INFO.flat().map(
          (b) =>
            nextBoosts.find((n) => n.boost.name === b.name) || {
              boost: b,
              withLord: "",
              noLord: "",
            }
        )
      )
    })

    // URL同期用のエンコード（正規化されたデータを対象にする）
    void encodeBoosts(nextBoosts.map(normalizeBoost)).then((encoded) => {
      const url = new URL(window.location.href)
      url.searchParams.set("boosts", encoded)
      window.history.replaceState(null, "", url.toString())
    })
  }

  return (
    <div className="flex h-svh flex-col gap-4 py-4 lg:grid lg:grid-cols-12 lg:gap-12 lg:p-4">
      <Card className="shrink-0 lg:col-span-4 lg:my-auto lg:h-full">
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="flex items-center text-nowrap">
            <title>あなたの総合値</title>
          </CardTitle>
          <CardAction className="flex items-center gap-2">
            <DynamicPreference
              onWonderActive={setIsWonderActive}
              onBoostsChange={handleDataChange}
            ></DynamicPreference>
            {/*<Label htmlFor="wonder-active">ワンダー出陣時</Label>
            <Switch
              id="wonder-active"
              checked={isWonderActive}
              onCheckedChange={(e) => setIsWonderActive(e)}
            />*/}
          </CardAction>
        </CardHeader>
        <CardContent className="my-auto flex w-full flex-col gap-4">
          <div className="min-h-29 rounded-lg border bg-emerald-500/10 p-4">
            <p className="text-5xl font-bold text-emerald-500 lg:text-7xl">
              <DynamicTotal
                isWonderActive={isWonderActive}
                type="withLord"
                className="font-bold text-emerald-500"
                boosts={boosts}
              />
            </p>
            <Badge
              className="mt-2 bg-emerald-500/20 text-muted-foreground"
              variant="outline"
            >
              ロード出陣時
            </Badge>
            {isWonderActive && (
              <Badge
                className="mt-2 ml-2 bg-emerald-500/20 text-muted-foreground"
                variant="outline"
              >
                ワンダー出陣時
              </Badge>
            )}
          </div>
          <div className="min-h-25 rounded-lg border bg-muted/40 p-4">
            <p className="text-4xl font-bold lg:text-6xl">
              <DynamicTotal
                isWonderActive={isWonderActive}
                type="noLord"
                className="font-bold"
                boosts={boosts}
              />
            </p>
            <Badge
              className="mt-2 bg-muted/60 text-muted-foreground"
              variant="outline"
            >
              ロードなし
            </Badge>
            {isWonderActive && (
              <Badge
                className="mt-2 ml-2 bg-muted/60 text-muted-foreground"
                variant="outline"
              >
                ワンダー出陣時
              </Badge>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Suspense fallback={null}>
            <DynamicActions boosts={boosts} />
          </Suspense>

          <Link
            className={cn(
              buttonVariants({ variant: "destructive", size: "default" }),
              "ml-auto lg:mx-auto"
            )}
            href="/step/1"
          >
            最初から計算する
          </Link>
        </CardFooter>
      </Card>

      <Card className="flex min-h-0 flex-col lg:col-span-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>ブースト一覧</CardTitle>
          <Badge variant="secondary">{boosts?.length ?? 0}項目</Badge>
        </CardHeader>
        <CardContent className="min-h-0 flex-1 py-2">
          <ScrollArea className="h-full rounded-md">
            <Suspense
              fallback={
                <div className="animate-pulse p-4 text-sm text-muted-foreground">
                  ブースト一覧を読み込み中...
                </div>
              }
            >
              <DynamicTableContainer
                key={boosts ? boosts.length : 0}
                boosts={boosts}
                onDataChangeAction={handleDataChange}
              />
            </Suspense>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
