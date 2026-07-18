import { BOOSTS } from "./boosts"
import { totalBoost } from "./total"
import { Boost } from "./types"

export function boostsToTSV(
  boosts: readonly Boost[],
  key: keyof Boost
): string {
  const sorted: Boost[typeof key][] = new Array(BOOSTS.flat().length)
  boosts.forEach((b) => {
    BOOSTS.flat().find((n, i) => {
      if (n === b.name) {
        sorted[i] = b[key]
        return true
      }
      return false
    })
  })

  if (key === "name") {
    return ["総合値", ...sorted].join("\t")
  }

  return [totalBoost(boosts, key), ...sorted].join("\t")
}
