"use client"

import { Input } from "@workspace/ui/components/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table"
import { EditableBoost, BoostName } from "@/lib/boost/types"
import { isValidDecimal, normalizeInputNumber } from "@/lib/boost/validation"
import { useState } from "react"

export interface EditableBoostsTableProps {
  initialBoosts: EditableBoost[]
  onChange: (boosts: EditableBoost[]) => void
  className?: string
}

export function EditableBoostsTable({
  initialBoosts,
  onChange,
  className,
}: EditableBoostsTableProps) {
  const [boosts, setBoosts] = useState(initialBoosts)

  const updateBoost = (
    name: BoostName,
    key: "noLord" | "withLord",
    value: string
  ) => {
    const n = normalizeInputNumber(value)

    if (!isValidDecimal(n)) return

    const next = boosts.map((boost) =>
      boost.name === name
        ? {
            ...boost,
            [key]: n,
          }
        : boost
    )

    setBoosts(next)
    onChange?.(next)
  }

  return (
    <Table className={className}>
      <TableCaption>クリックして編集</TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead className="w-25">ブースト</TableHead>
          <TableHead>ロードなし</TableHead>
          <TableHead>ロード出陣時</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {boosts.map((b) => (
          <TableRow
            key={b.name}
            className={
              b.name.includes("攻撃力")
                ? "bg-muted/80"
                : b.name.includes("HP")
                  ? "bg-muted/40"
                  : ""
            }
          >
            <TableCell className="font-medium">{b.name}</TableCell>

            <TableCell>
              <Popover>
                <PopoverTrigger className="w-full text-left">
                  {b.noLord || 0}
                </PopoverTrigger>

                <PopoverContent className="w-fit">
                  <Input
                    type="text"
                    inputMode="decimal"
                    value={b.noLord}
                    onChange={(e) =>
                      updateBoost(b.name, "noLord", e.target.value)
                    }
                    className="w-fit"
                  />
                </PopoverContent>
              </Popover>
            </TableCell>

            <TableCell>
              <Popover>
                <PopoverTrigger className="w-full text-left">
                  {b.withLord || 0}
                </PopoverTrigger>

                <PopoverContent className="w-fit">
                  <Input
                    type="text"
                    inputMode="decimal"
                    value={b.withLord}
                    onChange={(e) =>
                      updateBoost(b.name, "withLord", e.target.value)
                    }
                    className="w-fit"
                  />
                </PopoverContent>
              </Popover>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
