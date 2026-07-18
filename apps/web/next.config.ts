import type { NextConfig } from "next"

const isProd = process.env.NODE_ENV === "production"

const repoName = "lordsmobile-boost-calculator"

const nextConfig: NextConfig = {
  transpilePackages: ["@workspace/ui"],
  images: {
    unoptimized: true,
  },
  output: "export",

  // GitHub Pagesのサブディレクトリ階層のズレを吸収
  basePath: isProd ? `/${repoName}` : "",
  assetPrefix: isProd ? `/${repoName}/` : "",
}

export default nextConfig
