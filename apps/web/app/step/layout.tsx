import { ImgProvider } from "@/contexts/image/img-provider"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "ブースト計算設定",
  description:
    "スクリーンショットをアップロードして、あなたのロードモバイルのブースト値を解析します。",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ImgProvider>{children}</ImgProvider>
}
