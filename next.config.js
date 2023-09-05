const url = new URL(process.env.CMS_IMAGE_PATTERN);

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: url.protocol.replace(":", ""),
        hostname: url.hostname,
        port: url.port,
        pathname: url.pathname,
      },
      {
        protocol: "https",
        hostname: "i.imgur.com",
      },
    ],
  },
};

module.exports = nextConfig;
