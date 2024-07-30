/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    NEXT_PUBLIC_API_ROOT:
      process.env.NEXT_PUBLIC_API_ROOT ?? "NEXT_PUBLIC_API_ROOT",
    NEXT_PUBLIC_CONNECT_INTERNAL_ROOT_URL:
      process.env.NEXT_PUBLIC_CONNECT_INTERNAL_ROOT_URL,
    NEXT_PUBLIC_CONNECT_INTERNAL_CLIENT_ID:
      process.env.NEXT_PUBLIC_CONNECT_INTERNAL_CLIENT_ID,
    NEXT_PUBLIC_CLIENT_SECRET: process.env.NEXT_PUBLIC_CLIENT_SECRET,
    NEXT_PUBLIC_API_ROOT_V2:
      process.env.NEXT_PUBLIC_API_ROOT_V2 ?? "NEXT_PUBLIC_API_ROOT_V2",
  },
  async redirects() {
    return [
      // {
      //   source: "/system/administrative-division",
      //   destination: "/system/administrative-division/provinces",
      //   permanent: true,
      // },
      // {
      //   source: "/system",
      //   destination: "/system/settle-banks",
      //   permanent: true,
      // },
      // {
      //   source: "/master-merchant",
      //   destination: "/master-merchant/list",
      //   permanent: true,
      // },
      // {
      //   source: "/merchant-personal",
      //   destination: "/merchant-personal/list",
      //   permanent: true,
      // },
      // {
      //   source: "/merchant-corp",
      //   destination: "/merchant-corp/list",
      //   permanent: true,
      // },
      // {
      //   source: "/merchant-cashin",
      //   destination: "/merchant-cashin/list",
      //   permanent: true,
      // },
      // {
      //   source: "/merchant-branch",
      //   destination: "/merchant-branch/list",
      //   permanent: true,
      // },
    ];
  },
};

module.exports = nextConfig;
