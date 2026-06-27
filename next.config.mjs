/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // The double asterisk allows any domain
      },
      {
        protocol: 'http',
        hostname: '**', // Optional: Allows insecure HTTP images too
      },
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
