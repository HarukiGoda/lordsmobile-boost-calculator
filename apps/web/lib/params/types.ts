export interface AppParams {
  boosts: string // エンコードされたブースト情報
  preference: {
    // 祭壇・牢獄等の詳細
    altar: { active: boolean; level: number }
    prison: { active: boolean; level: number }
  }
  wonder: {
    // ワンダー等の状態
    active: boolean
  }
}
