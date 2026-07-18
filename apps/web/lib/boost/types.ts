import { BOOSTS } from "./boosts"

export type BoostName = (typeof BOOSTS)[number][number]

export interface Boost {
  name: BoostName
  noLord: number
  withLord: number
}

export interface EditableBoost {
  name: BoostName
  noLord: string
  withLord: string
}
