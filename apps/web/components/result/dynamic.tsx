"use client"

import { useBoostsParam } from "@/hooks/use-boosts-param"
import { normalizeBoost } from "@/lib/boost/normalize"
import { totalBoost } from "@/lib/boost/total"
import { Boost, EditableBoost } from "@/lib/boost/types"
import { useEffect, useRef } from "react"
import { EditableBoostsTable } from "../boost/editable-boosts-table"
import { BOOSTS_INFO } from "@/lib/boost/boosts"
import { BoostsActions } from "../boost/boosts-action"

export function DynamicTotal({
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

export function DynamicTableContainer({
  onDataChangeAction,
  boosts,
}: {
  onDataChangeAction: (data: EditableBoost[]) => void
  boosts: EditableBoost[] | null
}) {
  const getBoostsParam = useBoostsParam()
  const hasFetched = useRef(false)

  useEffect(() => {
    if (hasFetched.current) return
    hasFetched.current = true

    getBoostsParam().then((res) => {
      if (!res) return
      onDataChangeAction(
        res.map((b) => ({
          ...b,
          noLord: b.noLord.toString(),
          withLord: b.withLord.toString(),
        }))
      )
    })
  }, [getBoostsParam, onDataChangeAction])

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
      onChange={onDataChangeAction}
    />
  )
}

export function DynamicActions({
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
