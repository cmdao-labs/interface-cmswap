import type { NextConfig } from 'next'
 
const nextConfig: NextConfig = {
    webpack: config => {
        config.externals.push('pino-pretty', 'lokijs', 'encoding')
        return config
    },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'gateway.commudao.xyz',
            port: '',
            pathname: '/**',
            search: '',
          },
        ],
    },
}
 
export default nextConfig
