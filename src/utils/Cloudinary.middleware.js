import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'


cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.SECRET_KEY
});

 // Upload an image
 const uploadOnCloudinary = async(localPathFIle)=>
    {
        try {
            if(!localPathFIle) return null;
        // upload
        const response =await cloudinary.uploader.upload(localPathFIle,{
            resource_type:"auto"
        })
        // console.log("file is uploaded on cloudinary" , response.url)
        fs.unlinkSync(localPathFIle)
        return response      
        } 
        catch (error) {
            console.log(error)
            fs.unlinkSync(localPathFIle)
            return null
            
        }
    }
    
export {uploadOnCloudinary}
 


















