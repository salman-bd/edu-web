import { NextConfig } from 'next';
import { Configuration } from 'webpack';

/** @type {import('next').NextConfig} */
 
module.exports = {
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },
}

// next.config.js  
module.exports = {  
  images: {  
    domains: ['res.cloudinary.com'],  
  },  
};  

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/salmanbd/image/upload/**',
      },
    ],
  },
  webpack: (config: Configuration, { isServer }: { isServer: boolean }) => {
    // Example: Exclude unnecessary modules or libraries
    if (!isServer) {
      // Remove certain modules for the client
      config.resolve = config.resolve || {};
      config.resolve.alias = config.resolve.alias || {};
      (config.resolve.alias as { [key: string]: string | false })['cloudinary'] = false;
      (config.resolve.alias as { [key: string]: string | false })['bcrypt'] = false;
      (config.resolve.alias as { [key: string]: string | false })['mongoose'] = false;
      (config.resolve.alias as { [key: string]: string | false })['resend'] = false;
    }

    // Example: Add optimization options
    config.optimization = config.optimization || {};
    config.optimization.splitChunks = config.optimization.splitChunks || {};
    config.optimization.splitChunks.maxSize = 200 * 1024; // 200 KB

    // Example: Minimize output for production
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimize = true;
    }

    return config;
  },
};

export default nextConfig;