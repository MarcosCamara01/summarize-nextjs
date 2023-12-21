/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                pathname: '**',
            },
        ],
    },
    experimental: {
        serverComponentsExternalPackages: ['pdf2json'],
    }
};

module.exports = nextConfig;
