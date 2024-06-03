import {v2 as cloudinary} from 'cloudinary';
import fs from "fs"; 


// Cloudinary config credentials 
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET 
});


// cloudinary upload file
const uploadOnCloudinary = async (localpath) => {
    try {
        if(!localpath) 
            return null
        const response = await cloudinary.uploader.upload(localpath, {
            resource_type: "auto"
        })
        console.log("File uploaded successfully on Cloudinary...")
        return response
    } catch (error) {
        // To remove the file from local storage due to upload failed.
        fs.unlinkSync(localpath)
        return null
    }
}

export default uploadOnCloudinary
