import { BOOSTS_INFO } from "./boosts"

export type BoostName =
  | "歩兵攻撃力"
  | "弓兵攻撃力"
  | "騎兵攻撃力"
  | "攻城兵器攻撃力"
  | "罠攻撃力"
  | "歩兵防御力"
  | "弓兵防御力"
  | "騎兵防御力"
  | "攻城兵器防御力"
  | "罠防御力"
  | "歩兵HP"
  | "弓兵HP"
  | "騎兵HP"
  | "歩対弓強化ブースト"
  | "弓対騎強化ブースト"
  | "騎対歩強化ブースト"
  | "軍隊攻撃力"
  | "軍隊防御力"
  | "軍隊HP"
  // |"連合軍攻撃力"
  | "攻撃力弱体化"
  | "防御力弱体化"
  | "HP弱体化"
  | "ワンダー歩兵攻撃力"
  | "ワンダー弓兵攻撃力"
  | "ワンダー騎兵攻撃力"
  | "ワンダー歩兵防御力"
  | "ワンダー弓兵防御力"
  | "ワンダー騎兵防御力"
  | "ワンダー歩兵HP"
  | "ワンダー弓兵HP"
  | "ワンダー騎兵HP"
// |"ワンダー歩兵攻撃力弱体化"|"ワンダー弓兵攻撃力弱体化"|"ワンダー騎兵攻撃力弱体化"
// |"ワンダー歩兵防御力弱体化"|"ワンダー弓兵防御力弱体化"|"ワンダー騎兵防御力弱体化"
// |"ワンダー歩兵HP弱体化"|"ワンダー弓兵HP弱体化"|"ワンダー騎兵HP弱体化"

export interface BoostInfo {
  name: BoostName
  isOcrOnly: boolean
  modifier: number
  activeOn: "always" | "wonder"
}

export type TotalCalcBoostName = Extract<
  (typeof BOOSTS_INFO)[number][number],
  { isOcrOnly: false }
>["name"]

export interface Boost<T extends BoostInfo = BoostInfo> {
  boost: T
  noLord: number
  withLord: number
}

export interface EditableBoost<T extends BoostInfo = BoostInfo> {
  boost: T
  noLord: string
  withLord: string
}

export type TsvKey = Exclude<keyof Boost, "boost"> | "name"

export interface Preference {
  isPrison: boolean
  isAltar: boolean
  prisonLevel: LordLevel
  altarLevel: BuildingLevel
}

export type BuildingLevel =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31

export type LordLevel =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31
  | 32
  | 33
  | 34
  | 35
  | 36
  | 37
  | 38
  | 39
  | 40
  | 41
  | 42
  | 43
  | 44
  | 45
  | 46
  | 47
  | 48
  | 49
  | 50
  | 51
  | 52
  | 53
  | 54
  | 55
  | 56
  | 57
  | 58
  | 59
  | 60
  | 61
  | 62
  | 63
  | 64
  | 65
  | 66
