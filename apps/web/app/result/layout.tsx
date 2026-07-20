import { Metadata } from "next"

export const metadata: Metadata = {
  title: "ロードモバイル　ブースト・総合値計算ツール",
  description:
    "ブースト・総合値計算後の結果画面です！計算後の結果を確認できます。",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
