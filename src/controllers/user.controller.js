import {asyncHandler} from '../utils/asyncHandler.js'
import { errorHandler } from '../utils/ApiError.js'
import { User } from '../models/users.model.js'
import { uploadOnCloudinary } from '../utils/Cloudinary.middleware.js'
import {successHandler} from '../utils/ApiResponse.js'

const registerUser = asyncHandler(async(req,res)=>{
   const {userName, fullName, password, email} =req.body
//    console.log(fullName, email)

   if(
    [userName, fullName, password, email].some((field)=>
    field?.trim() === "")
   ){
    throw new errorHandler(" All the fields are required",400 )
   }

   const userAleready =await User.findOne({
    $or :[{email}, {userName}]
})
   
   if(userAleready){
    throw new errorHandler("User already exists", 400)
   }

   const avatarLocalPath = req.files?.avatar[0]?.path
   const coverImageLocalPath = req.files?.coverImage[0]?.path
   console.log(req.files)
   console.log(avatarLocalPath)

   if(!avatarLocalPath){
    throw new errorHandler("Avatar is must required", 401)

   }

   const onCloudinaryAvatar = await uploadOnCloudinary(avatarLocalPath)
   const onCloudinaryCoverImage =  await uploadOnCloudinary(coverImageLocalPath)
//    console.log(onCloudinaryAvatar)

   if(!onCloudinaryAvatar){
    throw new errorHandler("Something went wrong on uploading the avatar image, please do it again" , 500)
   }

//    if(!onCloudinaryCoverImage){
//     throw new errorHandler("Something went wrong on uploading the CoverImage, please do it again" , 500)
//    }

   const user =await User.create({
    userName:userName.toLowerCase(),
    fullName,
    password,
    email,
    avatar : onCloudinaryAvatar.url,
    coverImage: onCloudinaryCoverImage?.url || ""
   })

   const checkUser =await User.findById(user._id).select(
    "-password -refreshToken"
   )

   if(!checkUser){
    throw new errorHandler("Something went wrong while regestring the user", 500)
   }

   return res.status(201).json(
    new successHandler("User registered successfully" ,200, checkUser)
   )

  


})

export {registerUser}