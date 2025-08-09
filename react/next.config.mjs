/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/leetcode/:path*', // Match all routes under '/leetcode'
        destination: 'https://leetcode.com/graphql/:path*', // Proxy to the LeetCode GraphQL endpoint
      },
      {
        source: '/codechef/:path*', // Match all routes under '/codechef'
        destination: 'https://codechef-api.vercel.app/handle/:path*', // Proxy to the CodeChef API
      },
      {
        source: '/codeforces/:path*', // Separate path for Codeforces
        destination: 'https://codeforces-readme-stats.vercel.app/api/card?username=:path*', // Proxy to Codeforces stats
      },
    ];
  },
};

export default nextConfig;
