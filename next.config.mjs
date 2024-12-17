/** @type {import('next').NextConfig} */
const nextConfig = {
  compilerOptions: {
    baseUrl: ".",
    paths: {
      "@/*": ["./src/*"],
    },
  },
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
      {
        protocol: "https",
        hostname: "img.clerk.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
