/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      toRemotePattern(process.env.CMS_IMAGE_PATTERN),
      {
        protocol: "https",
        hostname: "i.imgur.com",
      },
    ],
  },
};

/**
 * @param { string } strUrl
 */
function toRemotePattern(strUrl) {
  const url = new URL(strUrl);

  return {
    protocol: url.protocol.replace(":", ""),
    hostname: url.hostname,
    port: url.port,
    pathname: url.pathname,
  };
}

module.exports = nextConfig;
