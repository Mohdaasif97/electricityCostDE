/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,

  // Fix 3XX redirect issues: ensure all non-www and HTTP variants resolve
  // to https://www. in a single hop, eliminating multi-hop redirect chains.
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'stromkostenrechner9.de' }],
        destination: 'https://www.stromkostenrechner9.de/:path*',
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;