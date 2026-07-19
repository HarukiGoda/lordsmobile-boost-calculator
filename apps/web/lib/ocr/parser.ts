import { BOOSTS_INFO } from "../boost/boosts"
import { EditableBoost } from "../boost/types"

export function parseBoostOCR(
  text: string,
  boosts: (typeof BOOSTS_INFO)[number]
): EditableBoost[] {
  if (!text) {
    return []
  }

  const regex = /\+(\d+(?:\.\d+)?)%/
  const lines = text.split("\n")

  return [
    ...lines,
    ...(new Array(Math.max(0, boosts.length - lines.length)).fill(
      ""
    ) as string[]),
  ]
    .map((line, i) => {
      const b: EditableBoost = {
        boost: boosts[i] ?? boosts[0], // it is ok because we slice the array later
        noLord: "",
        withLord: "",
      }

      const words = line.split(/\s+/)
      words.forEach((w, i) => {
        const match = w.match(regex)
        if (match) {
          const value = parseFloat(match[1]!)
          if (i === 0) {
            b.noLord = value.toString()
          } else if (i === 1) {
            b.withLord = value.toString()
          }
        }
      })

      if (words.length == 1) b.withLord = b.noLord
      return b
    })
    .slice(0, boosts.length)
}
