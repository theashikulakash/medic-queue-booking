/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allows any website domain using HTTPS
      },
      {
        protocol: 'http',
        hostname: '**', // Allows any website domain using HTTP
      },
    ],
  },
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;
