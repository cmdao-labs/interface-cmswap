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
          hostname: 'cmswap.pinata.cloud',
          port: '',
          pathname: '/**',
          search: '',
        },
      ],
    },
    env: {
      APP_VERSION: require('./package.json').version,
    },
}
 
export default nextConfig
