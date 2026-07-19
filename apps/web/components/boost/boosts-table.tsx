"use client"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table"
import { Boost } from "@/lib/boost/types"

export interface BoostsTableProps {
  boosts: Boost[]
  className?: string
}

export function BoostsTable({ boosts, className }: BoostsTableProps) {
  return (
    <Table className={className}>
      <TableCaption></TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead className="w-25">ブースト</TableHead>
          <TableHead>ロードなし</TableHead>
          <TableHead>ロード出陣時</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {boosts.map((b) => (
          <TableRow key={b.boost.name}>
            <TableCell className="font-medium">{b.boost.name}</TableCell>
            <TableCell>{b.noLord}</TableCell>
            <TableCell>{b.withLord}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
