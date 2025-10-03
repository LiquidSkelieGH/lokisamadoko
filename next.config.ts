import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* config options here */
  trailingSlash: true,
  images: {
    remotePatterns: [new URL('https://img.youtube.com/vi/**'), new URL('https://yt3.ggpht.com/**')]
  }
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
