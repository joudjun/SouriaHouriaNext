import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactCompiler: true,
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "localhost",
                port: "1337",
            },
            {
                protocol: "http",
                hostname: "46.224.225.63",
                port: "1337",
            },
        ],
    },
    async rewrites() {
        return [
            {
                source: "/uploads/:path*",
                destination: `${process.env.STRAPI_URL}/uploads/:path*`,
            },
        ];
    },
};

export default nextConfig;
