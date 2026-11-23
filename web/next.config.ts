import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  images: {
    localPatterns: [
      {
        pathname: "/**",
      },
    ],
  },
  turbopack: {
    root: __dirname,
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  async rewrites() {
    const backendUrl = (
      process.env.BACKEND_API_URL ?? "http://127.0.0.1:4000"
    ).replace(/\/+$/, "");

    return [
      {
        source: "/api/:path*",
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
  redirects() {
    return [
      {
        source: "/auth",
        destination: "/signin",
        permanent: false,
      },
      {
        source: "/signup",
        destination: "/signin?mode=signup",
        permanent: false,
      },
      {
        source: "/en/auth",
        destination: "/en/signin",
        permanent: false,
      },
      {
        source: "/en/signup",
        destination: "/en/signin?mode=signup",
        permanent: false,
      },
      {
        source: "/buttons-group",
        destination: "/buttons",
        permanent: true,
      },
      {
        source: "/modals",
        destination: "/dialogs",
        permanent: true,
      },
      {
        source: "/text-generator",
        destination: "/ai-chat/text",
        permanent: true,
      },
      {
        source: "/image-generator",
        destination: "/ai-chat/image",
        permanent: true,
      },
      {
        source: "/code-generator",
        destination: "/ai-chat/code",
        permanent: true,
      },
      {
        source: "/video-generator",
        destination: "/ai-chat/video",
        permanent: true,
      },
      {
        source: "/ai-settings",
        destination: "/ai-settings/account",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
