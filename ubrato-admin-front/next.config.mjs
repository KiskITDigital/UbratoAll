/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "standalone",
  poweredByHeader: false,
  reactStrictMode: false,
  experimental: {
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
  },
};

export default nextConfig;
