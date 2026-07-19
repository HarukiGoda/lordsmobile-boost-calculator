import { BOOSTS_INFO } from "./boosts"
import { totalBoost } from "./total"
import type { Boost, TsvKey } from "./types"

// remove column if isOcrOnly ==- true
export function boostsToTSV(boosts: readonly Boost[], key: TsvKey): string {
  const boostMap = new Map(
    BOOSTS_INFO.flat()
      .filter((b) => !b.isOcrOnly)
      .map((b): [string, Boost] => [
        b.name,
        { boost: b, noLord: 0, withLord: 0 },
      ])
  )

  boosts.forEach((b) => {
    if (boostMap.has(b.boost.name)) {
      boostMap.set(b.boost.name, b)
    }
  })

  const sorted = Array.from(boostMap.values())

  if (key === "name") {
    return ["総合値", ...sorted.map((s) => s.boost.name)].join("\t")
  }

  return [totalBoost(boosts, key), ...sorted.map((s) => s[key])].join("\t")
}
