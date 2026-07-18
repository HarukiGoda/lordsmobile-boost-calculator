import { EditableBoost, Boost } from "./types"

export function normalizeBoost(editable: EditableBoost): Boost {
  return {
    name: editable.name,
    noLord: Number(editable.noLord) || 0,
    withLord: Number(editable.withLord) || 0,
  }
}
