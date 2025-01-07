import multer from "multer";  
import path from 'path';  
import fs from 'fs';  

const tempDir = './public/temp';  
if (!fs.existsSync(tempDir)) {  
    fs.mkdirSync(tempDir, { recursive: true }); // Create dir if not exists  
}  

// Multer Storage Configuration  
const storage = multer.diskStorage({  
    destination: (req, file, cb) => {  
        cb(null, tempDir);  
    },  
    filename: (req, file, cb) => {  
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);  
        const fileExtension = path.extname(file.originalname);  
        const originalName = path.basename(file.originalname, fileExtension);  
        cb(null, `${originalName}-${uniqueSuffix}${fileExtension}`);  
    }  
});  

// Create the multer instance  
const upload = multer({ storage: storage });  

// API Route Handler  
const apiRoute = async (req, res) => {  
    // Use the multer upload middleware for handling single file uploads  
    await new Promise((resolve, reject) => {  
        upload.single('avatar')(req, res, (err) => {  
            if (err) return reject(err); // Handle errors  
            resolve(); // Resolve the promise upon successful upload  
        });  
    });  
    
    // Now you can access the uploaded file in req.file  
    const avatar = req.file;   

    if (avatar) {  
        console.log("Uploaded file:", avatar);  
        // Handle your logic here, for example saving user data in DB  
        return res.status(200).json({ success: true, message: 'File uploaded', filePath: avatar.path });  
    } else {  
        return res.status(400).json({ success: false, message: 'File upload failed' });  
    }  
};  

export default apiRoute;