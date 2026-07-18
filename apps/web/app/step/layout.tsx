import { ImgProvider } from "@/contexts/image/img-provider"

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ImgProvider>{children}</ImgProvider>
}
