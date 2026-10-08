import type { NextConfig } from "next";

// Project Pages serves the site at /portfolio. Local dev stays at /.
const basePath = process.env.GITHUB_PAGES === "true" ? "/portfolio" : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
};

export default nextConfig;
