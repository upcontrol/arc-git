import type { NextConfig } from "next";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
};

export default nextConfig;



module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.plugins.push(new MiniCssExtractPlugin());
    }
    return config;
  },
};