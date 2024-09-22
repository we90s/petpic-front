/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pet-pic.s3.ap-northeast-2.amazonaws.com",
        pathname: "/**",
      },
    ],
  },
  reactStrictMode: false,
  poweredByHeader: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  compiler: {
    styledComponents: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  output: "standalone", // 추가된 설정
};

module.exports = (phase, { defaultConfig }) => {
  return nextConfig; // 통합된 설정 반환
};
