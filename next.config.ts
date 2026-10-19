import type { NextConfig } from "next";

const securityHeaders = [
    {
        key: "X-DNS-Prefetch-Control",
        value: "on",
    },
    {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
    },
    {
        key: "X-Frame-Options",
        value: "SAMEORIGIN",
    },
    {
        key: "X-Content-Type-Options",
        value: "nosniff",
    },
    {
        key: "Referrer-Policy",
        value: "strict-origin-when-cross-origin",
    },
    {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=()",
    },
    {
        key: "Content-Security-Policy",
        value: [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
            "style-src 'self' 'unsafe-inline'",
            "img-src 'self' data: blob: http: https:",
            "font-src 'self' data:",
            "connect-src 'self' http: https: ws: wss:",
            "frame-src 'self' https://www.google.com https://maps.google.com",
            "frame-ancestors 'self'",
        ].join("; "),
    },
];

const nextConfig: NextConfig = {
    allowedDevOrigins: ["ogxhf-182-253-244-5.run.pinggy-free.link"],
    experimental: {
        mdxRs: true,
        serverActions: {
            bodySizeLimit: "20mb",
        },
    },
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: "http",
                hostname: "**",
            },
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: securityHeaders,
            },
        ];
    },
    async redirects() {
        return [
            {
                source: "/sambutan",
                destination: "/about/sambutan",
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
