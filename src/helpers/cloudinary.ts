import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";



// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        const response = await cloudinary.uploader.upload(localFilePath, {resource_type: "auto"});
  
        console.log("\nThe file has been uploaded, the file URL: ", response.secure_url);

        fs.unlinkSync(localFilePath);
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath); // remove locally save TF if the upload operation gets fail
        return null;
    }
    
};

export { uploadOnCloudinary };