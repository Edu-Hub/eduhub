/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false, async redirects() {
        return [{
            source: '/', destination: '/app', permanent: true,
        },]
    }, webpack: (config) => {
        config.experiments = config.experiments || {};
        config.experiments.topLevelAwait = true;
        return config;
    },
}

module.exports = nextConfig
