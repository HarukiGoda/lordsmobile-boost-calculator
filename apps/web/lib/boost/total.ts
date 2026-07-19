import { BOOSTS_INFO } from "./boosts"
import { Boost } from "./types"

export function totalBoost(
  boosts: readonly Boost[],
  key: Exclude<keyof Boost, "boost">
) {
  return boosts.reduce(
    (total, boost) =>
      total +
      Number(
        boost[key] *
          (BOOSTS_INFO.flat()
            .filter((b) => !b.isOcrOnly)
            .find((b) => b.name === boost.boost.name)?.modifier ?? 0)
      ),
    0
  )
}
