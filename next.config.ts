// next.config.js  
const nextConfig = {  
  webpack: (config, { isServer }) => {  
    // Example: Exclude unnecessary modules or libraries  
    if (!isServer) {  
      // Remove certain modules for the client  
      config.resolve.alias['cloudinary'] = false;  
      config.resolve.alias['bcrypt'] = false;   
      config.resolve.alias['mongoose'] = false;   
      config.resolve.alias['pg'] = false;   
      config.resolve.alias['resend'] = false;   
      config.resolve.alias['aws-amplify'] = false;   
    }  

    // Example: Add optimization options  
    config.optimization.splitChunks.maxSize = 200000; 


    

    // Example: Minimize output for production  
    if (process.env.NODE_ENV === 'production') {  
      config.optimization.minimize = true;  
    }  

    return config;  
  },  
};  


module.exports = nextConfig;