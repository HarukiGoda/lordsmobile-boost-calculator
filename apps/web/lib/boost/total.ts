import { BOOSTS_INFO } from "./boosts"
import { Boost } from "./types"

const BOOST_MAP = new Map(BOOSTS_INFO.flat().map((b) => [b.name, b]))

export function totalBoost(
  boosts: readonly Boost[],
  key: Exclude<keyof Boost, "boost">,
  cond?: (b: Boost) => boolean
) {
  return boosts.reduce((total, boost) => {
    const info = BOOST_MAP.get(boost.boost.name)

    const isAllowed = info && !info.isOcrOnly && (cond ? cond(boost) : true)
    const modifier = isAllowed ? info.modifier : 0

    return total + boost[key] * modifier
  }, 0)
}
