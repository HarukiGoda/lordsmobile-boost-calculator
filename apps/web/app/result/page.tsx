"use client"

import { EditableBoostsTable } from "@/components/boost/editable-boosts-table"
import { useBoostsParam } from "@/hooks/use-boosts-param"
import { useState, useEffect, Suspense, startTransition, useRef } from "react"
import { Boost, EditableBoost } from "@/lib/boost/types"
import { BoostsActions } from "@/components/boost/boosts-action"
import { totalBoost } from "@/lib/boost/total"
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
import { Switch } from "@workspace/ui/components/switch"
import { Badge } from "@workspace/ui/components/badge"
import { useRouter } from "next/navigation"
import { encodeBoosts } from "@/lib/codec/boost-codec"
import { BOOSTS_INFO } from "@/lib/boost/boosts"
import { buttonVariants } from "@workspace/ui/components/button"
import Link from "next/link"
import { cn } from "@workspace/ui/lib/utils"
import { Label } from "@workspace/ui/components/label"

function DynamicTotal({
  type,
  className,
  boosts,
  isWonderActive,
}: {
  type: "withLord" | "noLord"
  className: string
  boosts: EditableBoost[] | null
  isWonderActive: boolean
}) {
  const cond = (b: Boost) => {
    if (b.boost.activeOn === "wonder" ? isWonderActive : true) {
      console.log("Active: ", b.boost.name)
    }
    return b.boost.activeOn === "wonder" ? isWonderActive : true
  }

  return (
    <span className={className}>
      {boosts
        ? totalBoost(boosts.map(normalizeBoost), type, cond).toFixed(0)
        : "---"}
    </span>
  )
}

function DynamicTableContainer({
  onDataChange,
  boosts,
}: {
  onDataChange: (data: EditableBoost[]) => void
  boosts: EditableBoost[] | null
}) {
  const getBoostsParam = useBoostsParam()
  const hasFetched = useRef(false)

  useEffect(() => {
    if (hasFetched.current) return
    hasFetched.current = true

    getBoostsParam().then((res) => {
      if (!res) return
      onDataChange(
        res.map((b) => ({
          ...b,
          noLord: b.noLord.toString(),
          withLord: b.withLord.toString(),
        }))
      )
    })
  }, [getBoostsParam, onDataChange])

  return (
    <EditableBoostsTable
      initialBoosts={
        boosts?.filter((b) => !b.boost.isOcrOnly) ??
        BOOSTS_INFO.flat()
          .filter((b) => !b.isOcrOnly)
          .map((b) => ({
            boost: b,
            withLord: "0",
            noLord: "0",
          }))
      }
      onChange={onDataChange}
    />
  )
}

function DynamicActions({
  boosts,
  className,
}: {
  boosts: EditableBoost[] | null
  className?: string
}) {
  return (
    <BoostsActions
      className={className}
      boosts={boosts ? boosts.map(normalizeBoost) : []}
    />
  )
}

export default function Page() {
  const [boosts, setBoosts] = useState<EditableBoost[] | null>(null)
  const [isWonderActive, setIsWonderActive] = useState(true)
  const router = useRouter()

  const handleDataChange = (newData: EditableBoost[]) => {
    startTransition(() => {
      setBoosts(
        BOOSTS_INFO.flat().map(
          (b) =>
            newData.find((n) => n.boost.name === b.name) || {
              boost: b,
              withLord: "",
              noLord: "",
            }
        )
      )
    })

    encodeBoosts(newData.map(normalizeBoost)).then((encoded) => {
      router.replace(`/result?boosts=${encoded}`)
    })
  }

  return (
    <div className="flex h-svh flex-col gap-4 py-4 lg:grid lg:grid-cols-12 lg:gap-12 lg:p-4">
      <Card className="shrink-0 lg:col-span-4 lg:my-auto lg:h-full">
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="flex items-center text-nowrap">
            あなたの総合値
          </CardTitle>
          <CardAction className="flex items-center gap-2">
            <Label htmlFor="wonder-active">ワンダー</Label>
            <Switch
              id="wonder-active"
              checked={isWonderActive}
              onCheckedChange={(e) => setIsWonderActive(e)}
            />
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
                onDataChange={handleDataChange}
              />
            </Suspense>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
