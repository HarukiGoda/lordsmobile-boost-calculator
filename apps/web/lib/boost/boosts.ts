import { Boost, BoostInfo, Preference } from "./types"

// Sorted!!! by step and in game order
export const BOOSTS_INFO = [
  // split for steps
  [
    { name: "歩兵攻撃力", isOcrOnly: false, modifier: 1, activeOn: "always" },
    { name: "弓兵攻撃力", isOcrOnly: false, modifier: 1, activeOn: "always" },
    { name: "騎兵攻撃力", isOcrOnly: false, modifier: 1, activeOn: "always" },
    {
      name: "攻城兵器攻撃力",
      isOcrOnly: true,
      modifier: 0,
      activeOn: "always",
    },
    { name: "罠攻撃力", isOcrOnly: true, modifier: 0, activeOn: "always" },
    { name: "歩兵防御力", isOcrOnly: true, modifier: 0, activeOn: "always" },
    { name: "弓兵防御力", isOcrOnly: true, modifier: 0, activeOn: "always" },
    { name: "騎兵防御力", isOcrOnly: true, modifier: 0, activeOn: "always" },
    {
      name: "攻城兵器防御力",
      isOcrOnly: true,
      modifier: 0,
      activeOn: "always",
    },
    { name: "罠防御力", isOcrOnly: true, modifier: 0, activeOn: "always" },
    { name: "歩兵HP", isOcrOnly: false, modifier: 1, activeOn: "always" },
    { name: "弓兵HP", isOcrOnly: false, modifier: 1, activeOn: "always" },
    { name: "騎兵HP", isOcrOnly: false, modifier: 1, activeOn: "always" },
  ],
  [
    {
      name: "歩対弓強化ブースト",
      isOcrOnly: false,
      modifier: 0,
      activeOn: "always",
    },
    {
      name: "弓対騎強化ブースト",
      isOcrOnly: false,
      modifier: 0,
      activeOn: "always",
    },
    {
      name: "騎対歩強化ブースト",
      isOcrOnly: false,
      modifier: 0,
      activeOn: "always",
    },
  ],
  [
    { name: "軍隊攻撃力", isOcrOnly: false, modifier: 3, activeOn: "always" },
    { name: "軍隊防御力", isOcrOnly: true, modifier: 0, activeOn: "always" },
    { name: "軍隊HP", isOcrOnly: false, modifier: 3, activeOn: "always" },
  ],
  // { name: "連合軍攻撃力", isOcrOnly: false, modifier: 3, activeOn: "always" },
  [
    { name: "攻撃力弱体化", isOcrOnly: false, modifier: 0, activeOn: "always" },
    { name: "防御力弱体化", isOcrOnly: false, modifier: 0, activeOn: "always" },
    { name: "HP弱体化", isOcrOnly: false, modifier: 0, activeOn: "always" },
  ],
  [
    {
      name: "ワンダー歩兵攻撃力",
      isOcrOnly: false,
      modifier: 1,
      activeOn: "wonder",
    },
    {
      name: "ワンダー弓兵攻撃力",
      isOcrOnly: false,
      modifier: 1,
      activeOn: "wonder",
    },
    {
      name: "ワンダー騎兵攻撃力",
      isOcrOnly: false,
      modifier: 1,
      activeOn: "wonder",
    },
    {
      name: "ワンダー歩兵防御力",
      isOcrOnly: true,
      modifier: 0,
      activeOn: "wonder",
    },
    {
      name: "ワンダー弓兵防御力",
      isOcrOnly: true,
      modifier: 0,
      activeOn: "wonder",
    },
    {
      name: "ワンダー騎兵防御力",
      isOcrOnly: true,
      modifier: 0,
      activeOn: "wonder",
    },
    {
      name: "ワンダー歩兵HP",
      isOcrOnly: false,
      modifier: 1,
      activeOn: "wonder",
    },
    {
      name: "ワンダー弓兵HP",
      isOcrOnly: false,
      modifier: 1,
      activeOn: "wonder",
    },
    {
      name: "ワンダー騎兵HP",
      isOcrOnly: false,
      modifier: 1,
      activeOn: "wonder",
    },
  ],
  // { name: "ワンダー歩兵防御力弱体化", isOcrOnly: false, modifier: 0, activeOn: "wonder" },
  // { name: "ワンダー弓兵防御力弱体化", isOcrOnly: false, modifier: 0, activeOn: "wonder" },
  // { name: "ワンダー騎兵防御力弱体化", isOcrOnly: false, modifier: 0, activeOn: "wonder" },
  // { name: "ワンダー歩兵HP弱体化", isOcrOnly: false, modifier: 0, activeOn: "wonder" },
  // { name: "ワンダー弓兵HP弱体化", isOcrOnly: false, modifier: 0, activeOn: "wonder" },
  // { name: "ワンダー騎兵HP弱体化", isOcrOnly: false, modifier: 0, activeOn: "wonder" },
] as const satisfies readonly [
  readonly BoostInfo[],
  readonly BoostInfo[],
  readonly BoostInfo[],
  readonly BoostInfo[],
  readonly BoostInfo[],
]

export type AdditionalBoostName =
  | "歩兵攻撃力"
  | "弓兵攻撃力"
  | "騎兵攻撃力"
  | "歩兵HP"
  | "弓兵HP"
  | "騎兵HP"
  | "軍隊攻撃力"
  | "軍隊防御力"
  | "軍隊HP"

type AdditionalBoost = Boost<
  Extract<(typeof BOOSTS_INFO)[number][number], { name: AdditionalBoostName }>
>
export function getAdditionalBoostFromPreference(
  p: Preference
): AdditionalBoost[] {
  const { isPrison, isAltar, prisonLevel, altarLevel } = p

  const res: Record<AdditionalBoostName, AdditionalBoost> = {
    歩兵攻撃力: { boost: BOOSTS_INFO[0][0], noLord: 0, withLord: 0 },
    弓兵攻撃力: { boost: BOOSTS_INFO[0][1], noLord: 0, withLord: 0 },
    騎兵攻撃力: { boost: BOOSTS_INFO[0][2], noLord: 0, withLord: 0 },
    歩兵HP: { boost: BOOSTS_INFO[0][10], noLord: 0, withLord: 0 },
    弓兵HP: { boost: BOOSTS_INFO[0][11], noLord: 0, withLord: 0 },
    騎兵HP: { boost: BOOSTS_INFO[0][12], noLord: 0, withLord: 0 },
    軍隊攻撃力: { boost: BOOSTS_INFO[2][0], noLord: 0, withLord: 0 },
    軍隊防御力: { boost: BOOSTS_INFO[2][1], noLord: 0, withLord: 0 },
    軍隊HP: { boost: BOOSTS_INFO[2][2], noLord: 0, withLord: 0 },
  }

  if (isPrison) {
    if (prisonLevel >= 60) {
      res["軍隊攻撃力"].noLord += 30
      res["軍隊攻撃力"].withLord += 30
    } else if (prisonLevel >= 55) {
      res["軍隊攻撃力"].noLord += 23
      res["軍隊攻撃力"].withLord = 23
    } else if (prisonLevel >= 50) {
      res["軍隊攻撃力"].noLord += 17
      res["軍隊攻撃力"].withLord += 17
    } else if (prisonLevel >= 45) {
      res["軍隊攻撃力"].noLord += 12
      res["軍隊攻撃力"].withLord += 12
    } else if (prisonLevel >= 40) {
      res["軍隊攻撃力"].noLord += 8
      res["軍隊攻撃力"].withLord += 8
    } else if (prisonLevel >= 35) {
      res["軍隊攻撃力"].noLord += 5
      res["軍隊攻撃力"].withLord += 5
    } else if (prisonLevel >= 30) {
      res["軍隊攻撃力"].noLord += 3
      res["軍隊攻撃力"].withLord += 3
    } else if (prisonLevel >= 25) {
      res["軍隊攻撃力"].noLord += 2
      res["軍隊攻撃力"].withLord += 2
    } else if (prisonLevel >= 20) {
      res["軍隊攻撃力"].noLord += 1
      res["軍隊攻撃力"].withLord += 1
    }
  }

  if (isAltar) {
    switch (altarLevel) {
      case 1:
        res["軍隊攻撃力"].noLord += 1
        res["軍隊攻撃力"].withLord += 1
        res["軍隊防御力"].noLord += 0
        res["軍隊防御力"].withLord += 0
        res["軍隊HP"].noLord += 0
        res["軍隊HP"].withLord += 0
        break
      case 2:
        res["軍隊攻撃力"].noLord += 1
        res["軍隊攻撃力"].withLord += 1
        res["軍隊防御力"].noLord += 1
        res["軍隊防御力"].withLord += 1
        res["軍隊HP"].noLord += 0
        res["軍隊HP"].withLord += 0
        break
      case 3:
        res["軍隊攻撃力"].noLord += 1
        res["軍隊攻撃力"].withLord += 1
        res["軍隊防御力"].noLord += 1
        res["軍隊防御力"].withLord += 1
        res["軍隊HP"].noLord += 1
        res["軍隊HP"].withLord += 1
        break
      case 4:
        res["軍隊攻撃力"].noLord += 2
        res["軍隊攻撃力"].withLord += 2
        res["軍隊防御力"].noLord += 1
        res["軍隊防御力"].withLord += 1
        res["軍隊HP"].noLord += 1
        res["軍隊HP"].withLord += 1
        break
      case 5:
        res["軍隊攻撃力"].noLord += 2
        res["軍隊攻撃力"].withLord += 2
        res["軍隊防御力"].noLord += 2
        res["軍隊防御力"].withLord += 2
        res["軍隊HP"].noLord += 1
        res["軍隊HP"].withLord += 1
        break
      case 6:
        res["軍隊攻撃力"].noLord += 2
        res["軍隊攻撃力"].withLord += 2
        res["軍隊防御力"].noLord += 2
        res["軍隊防御力"].withLord += 2
        res["軍隊HP"].noLord += 2
        res["軍隊HP"].withLord += 2
        break
      case 7:
        res["軍隊攻撃力"].noLord += 3
        res["軍隊攻撃力"].withLord += 3
        res["軍隊防御力"].noLord += 2
        res["軍隊防御力"].withLord += 2
        res["軍隊HP"].noLord += 2
        res["軍隊HP"].withLord += 2
        break
      case 8:
        res["軍隊攻撃力"].noLord += 3
        res["軍隊攻撃力"].withLord += 3
        res["軍隊防御力"].noLord += 3
        res["軍隊防御力"].withLord += 3
        res["軍隊HP"].noLord += 2
        res["軍隊HP"].withLord += 2
        break
      case 9:
        res["軍隊攻撃力"].noLord += 3
        res["軍隊攻撃力"].withLord += 3
        res["軍隊防御力"].noLord += 3
        res["軍隊防御力"].withLord += 3
        res["軍隊HP"].noLord += 3
        res["軍隊HP"].withLord += 3
        break
      case 10:
        res["軍隊攻撃力"].noLord += 6
        res["軍隊攻撃力"].withLord += 6
        res["軍隊防御力"].noLord += 3
        res["軍隊防御力"].withLord += 3
        res["軍隊HP"].noLord += 3
        res["軍隊HP"].withLord += 3
        break
      case 11:
        res["軍隊攻撃力"].noLord += 6
        res["軍隊攻撃力"].withLord += 6
        res["軍隊防御力"].noLord += 6
        res["軍隊防御力"].withLord += 6
        res["軍隊HP"].noLord += 3
        res["軍隊HP"].withLord += 3
        break
      case 12:
        res["軍隊攻撃力"].noLord += 6
        res["軍隊攻撃力"].withLord += 6
        res["軍隊防御力"].noLord += 6
        res["軍隊防御力"].withLord += 6
        res["軍隊HP"].noLord += 6
        res["軍隊HP"].withLord += 6
        break
      case 13:
        res["軍隊攻撃力"].noLord += 10
        res["軍隊攻撃力"].withLord += 10
        res["軍隊防御力"].noLord += 6
        res["軍隊防御力"].withLord += 6
        res["軍隊HP"].noLord += 6
        res["軍隊HP"].withLord += 6
        break
      case 14:
        res["軍隊攻撃力"].noLord += 10
        res["軍隊攻撃力"].withLord += 10
        res["軍隊防御力"].noLord += 10
        res["軍隊防御力"].withLord += 10
        res["軍隊HP"].noLord += 6
        res["軍隊HP"].withLord += 6
        break
      case 15:
        res["軍隊攻撃力"].noLord += 10
        res["軍隊攻撃力"].withLord += 10
        res["軍隊防御力"].noLord += 10
        res["軍隊防御力"].withLord += 10
        res["軍隊HP"].noLord += 10
        res["軍隊HP"].withLord += 10
        break
      case 16:
        res["軍隊攻撃力"].noLord += 15
        res["軍隊攻撃力"].withLord += 15
        res["軍隊防御力"].noLord += 10
        res["軍隊防御力"].withLord += 10
        res["軍隊HP"].noLord += 10
        res["軍隊HP"].withLord += 10
        break
      case 17:
        res["軍隊攻撃力"].noLord += 15
        res["軍隊攻撃力"].withLord += 15
        res["軍隊防御力"].noLord += 15
        res["軍隊防御力"].withLord += 15
        res["軍隊HP"].noLord += 10
        res["軍隊HP"].withLord += 10
        break
      case 18:
        res["軍隊攻撃力"].noLord += 15
        res["軍隊攻撃力"].withLord += 15
        res["軍隊防御力"].noLord += 15
        res["軍隊防御力"].withLord += 15
        res["軍隊HP"].noLord += 15
        res["軍隊HP"].withLord += 15
        break
      case 19:
        res["軍隊攻撃力"].noLord += 21
        res["軍隊攻撃力"].withLord += 21
        res["軍隊防御力"].noLord += 15
        res["軍隊防御力"].withLord += 15
        res["軍隊HP"].noLord += 15
        res["軍隊HP"].withLord += 15
        break
      case 20:
        res["軍隊攻撃力"].noLord += 21
        res["軍隊攻撃力"].withLord += 21
        res["軍隊防御力"].noLord += 21
        res["軍隊防御力"].withLord += 21
        res["軍隊HP"].noLord += 15
        res["軍隊HP"].withLord += 15
        break
      case 21:
        res["軍隊攻撃力"].noLord += 21
        res["軍隊攻撃力"].withLord += 21
        res["軍隊防御力"].noLord += 21
        res["軍隊防御力"].withLord += 21
        res["軍隊HP"].noLord += 21
        res["軍隊HP"].withLord += 21
        break
      case 22:
        res["軍隊攻撃力"].noLord += 28
        res["軍隊攻撃力"].withLord += 28
        res["軍隊防御力"].noLord += 21
        res["軍隊防御力"].withLord += 21
        res["軍隊HP"].noLord += 21
        res["軍隊HP"].withLord += 21
        break
      case 23:
        res["軍隊攻撃力"].noLord += 28
        res["軍隊攻撃力"].withLord += 28
        res["軍隊防御力"].noLord += 28
        res["軍隊防御力"].withLord += 28
        res["軍隊HP"].noLord += 21
        res["軍隊HP"].withLord += 21
        break
      case 24:
        res["軍隊攻撃力"].noLord += 28
        res["軍隊攻撃力"].withLord += 28
        res["軍隊防御力"].noLord += 28
        res["軍隊防御力"].withLord += 28
        res["軍隊HP"].noLord += 28
        res["軍隊HP"].withLord += 28
        break
      case 25:
        res["軍隊攻撃力"].noLord += 38
        res["軍隊攻撃力"].withLord += 38
        res["軍隊防御力"].noLord += 38
        res["軍隊防御力"].withLord += 38
        res["軍隊HP"].noLord += 38
        res["軍隊HP"].withLord += 38
        break
      case 26:
        res["軍隊攻撃力"].noLord += 38.4
        res["軍隊攻撃力"].withLord += 38.4
        res["軍隊防御力"].noLord += 38.4
        res["軍隊防御力"].withLord += 38.4
        res["軍隊HP"].noLord += 38.4
        res["軍隊HP"].withLord += 38.4
        break
      case 27:
        res["軍隊攻撃力"].noLord += 38.8
        res["軍隊攻撃力"].withLord += 38.8
        res["軍隊防御力"].noLord += 38.8
        res["軍隊防御力"].withLord += 38.8
        res["軍隊HP"].noLord += 38.8
        res["軍隊HP"].withLord += 38.8
        break
      case 28:
        res["軍隊攻撃力"].noLord += 39.2
        res["軍隊攻撃力"].withLord += 39.2
        res["軍隊防御力"].noLord += 39.2
        res["軍隊防御力"].withLord += 39.2
        res["軍隊HP"].noLord += 39.2
        res["軍隊HP"].withLord += 39.2
        break
      case 29:
        res["軍隊攻撃力"].noLord += 39.6
        res["軍隊攻撃力"].withLord += 39.6
        res["軍隊防御力"].noLord += 39.6
        res["軍隊防御力"].withLord += 39.6
        res["軍隊HP"].noLord += 39.6
        res["軍隊HP"].withLord += 39.6
        break
      case 30:
        res["軍隊攻撃力"].noLord += 40
        res["軍隊攻撃力"].withLord += 40
        res["軍隊防御力"].noLord += 40
        res["軍隊防御力"].withLord += 40
        res["軍隊HP"].noLord += 40
        res["軍隊HP"].withLord += 40
        break
      case 31:
        res["軍隊攻撃力"].noLord += 40.4
        res["軍隊攻撃力"].withLord += 40.4
        res["軍隊防御力"].noLord += 40.4
        res["軍隊防御力"].withLord += 40.4
        res["軍隊HP"].noLord += 40.4
        res["軍隊HP"].withLord += 40.4
        break
      default:
        break // unreachable!
    }
  }

  return Object.values(res).filter((b) => b.noLord > 0 || b.withLord > 0)
}
