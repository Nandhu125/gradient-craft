/** @type {import('next').NextConfig} */

// Applied to every route. Conservative defaults that don't affect the app's
// own behaviour but remove the X-Powered-By leak and common headers gaps.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

// public/ assets are served without a content hash, so browsers revalidate them
// on every visit by default. These files are effectively immutable (a changed
// asset ships under a new name), so cache them hard for repeat visits.
const staticAssetCache = [
  { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
];

const nextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.qrserver.com',
        pathname: '/**',
      },
    ],
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/:path*.(mp4|webp|png|jpg|jpeg|svg|woff2)",
        headers: staticAssetCache,
      },
    ];
  },
};

export default nextConfig;
