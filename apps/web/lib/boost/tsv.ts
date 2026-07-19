import { BOOSTS_INFO } from "./boosts"
import { totalBoost } from "./total"
import type { Boost, TsvKey } from "./types"

// remove column if isOcrOnly ==- true
export function boostsToTSV(boosts: readonly Boost[], key: TsvKey): string {
  const sorted = BOOSTS_INFO.flat()
    .filter((b) => !b.isOcrOnly)
    .map((b) => ({
      boost: b,
      noLord: 0,
      withLord: 0,
    })) satisfies Boost[]
  boosts.forEach((b) => {
    ;[...sorted].find((n, i) => {
      if (n.boost.name === b.boost.name) {
        ;(sorted[i] as Boost) = b as Boost
        return true
      }
      return false
    })
  })

  if (key === "name") {
    return ["総合値", ...sorted.map((s) => s.boost.name)].join("\t")
  }

  return [totalBoost(boosts, key), ...sorted.map((s) => s[key])].join("\t")
}
