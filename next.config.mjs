/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "mango.blender.org",
      "www.heavenofhorror.com",
      "i.ytimg.com",
      "thevinedc.com",
    ], // Add other domains here if needed
  },
};

export default nextConfig;
