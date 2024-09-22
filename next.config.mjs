/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "cdn.icon-icons.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "q-xx.bstatic.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "www.google.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "t-cf.bstatic.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
