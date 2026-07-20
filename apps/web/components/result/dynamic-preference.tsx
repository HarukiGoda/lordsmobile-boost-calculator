import { getAdditionalBoostFromPreference } from "@/lib/boost/boosts"
import { EditableBoost, Preference } from "@/lib/boost/types"
import { Button } from "@workspace/ui/components/button"
import { Label } from "@workspace/ui/components/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover"
import { Switch } from "@workspace/ui/components/switch"
import React, { useState } from "react"

export interface DynamicPreferenceProps {
  // boosts: EditableBoost[]
  onBoostsChange: React.Dispatch<React.SetStateAction<EditableBoost[]>>
  onWonderActive: (c: boolean) => void
}

export function DynamicPreference({
  // boosts,
  onBoostsChange,
  onWonderActive,
}: DynamicPreferenceProps) {
  const [pref, setPref] = useState<Preference>({
    isAltar: false,
    isPrison: false,
    altarLevel: 25,
    prisonLevel: 60,
  })

  const handleTogglePreference = (key: keyof Preference) => {
    const nextPref = { ...pref, [key]: !pref[key] }

    const currentAdditional = getAdditionalBoostFromPreference(pref)
    const nextAdditional = getAdditionalBoostFromPreference(nextPref)

    setPref(nextPref)

    onBoostsChange((prev) => {
      const map = new Map(prev.map((b) => [b.boost.name, b]))

      currentAdditional.forEach((b) => {
        const existing = map.get(b.boost.name)
        if (existing) {
          map.set(b.boost.name, {
            ...existing,
            noLord: (Number(existing.noLord) - Number(b.noLord)).toString(),
            withLord: (
              Number(existing.withLord) - Number(b.withLord)
            ).toString(),
          })
        }
      })

      nextAdditional.forEach((b) => {
        const existing = map.get(b.boost.name)
        if (existing) {
          map.set(b.boost.name, {
            ...existing,
            noLord: (Number(existing.noLord) + Number(b.noLord)).toString(),
            withLord: (
              Number(existing.withLord) + Number(b.withLord)
            ).toString(),
          })
        } else {
          map.set(b.boost.name, {
            ...b,
            noLord: b.noLord.toString(),
            withLord: b.withLord.toString(),
          })
        }
      })

      return Array.from(map.values())
    })
  }

  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>
        出陣ステータス・バフ設定
      </PopoverTrigger>
      <PopoverContent className="grid w-fit grid-cols-3 gap-6">
        <div className="col-span-3 grid grid-cols-subgrid items-center">
          <Label className="col-span-2">ワンダー出陣時</Label>
          <Switch className="mx-auto" onCheckedChange={onWonderActive} />
        </div>
        <div className="col-span-3 grid grid-cols-subgrid items-center">
          <Label className="col-span-2">捕虜ブーストを追加する</Label>
          <Switch
            className="mx-auto"
            checked={pref.isPrison}
            onCheckedChange={() => handleTogglePreference("isPrison")}
          />
        </div>
        <div className="col-span-3 grid grid-cols-subgrid items-center">
          <Label className="col-span-2">祭壇ブーストを追加する</Label>
          <Switch
            className="mx-auto"
            checked={pref.isAltar}
            onCheckedChange={() => handleTogglePreference("isAltar")}
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}
