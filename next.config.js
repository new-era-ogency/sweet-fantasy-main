/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.espresso-international.com',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: 'www.comptoirsrichard.fr',
        pathname: '/media/**',
      },
    ],
  },
};

module.exports = nextConfig;
