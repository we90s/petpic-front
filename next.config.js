/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  poweredByHeader: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["pet-pic.s3.ap-northeast-2.amazonaws.com"],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

module.exports = (phase, { defaultConfig }) => {
 
  const nextConfig = {
      output: "standalone",
    /* config options here */
  }
  return nextConfig;
};

