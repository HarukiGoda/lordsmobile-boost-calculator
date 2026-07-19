import { BoostInfo } from "./types"

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
