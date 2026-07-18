import { BOOST_MODIFIERS } from "./boosts"
import { Boost } from "./types"

export function totalBoost(
  boosts: readonly Boost[],
  key: Exclude<keyof Boost, "name">
) {
  return boosts.reduce(
    (total, boost) => total + Number(boost[key] * BOOST_MODIFIERS[boost.name]),
    0
  )
}
