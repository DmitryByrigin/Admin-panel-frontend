/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'th.bing.com',
      'nextui-docs-v2.vercel.app',
      'nextui-org.vercel.app',
      'nextui.vercel.app',
      'nextui-docs.v',
      'preschool.dreamstechnologies.com',
    ],
    formats: ['image/avif', 'image/webp'],
  },
};

module.exports = nextConfig;
