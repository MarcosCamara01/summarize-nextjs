/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['lh3.googleusercontent.com'],
    },
    experimental: {
        serverComponentsExternalPackages: ['pdf2json'],
    }
};

module.exports = nextConfig;
