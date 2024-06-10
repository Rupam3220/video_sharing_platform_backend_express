// utils import
import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js"
import apiResponse from "../utils/apiResponse.js";
// model import
import { User } from "../models/userModel.js"
// cloudinary import
import uploadOnCloudinary from "../utils/cloudinary.js";

import mongoose from "mongoose";


// Register start
const userRegister = asyncHandler(async (req, res) => {

    // get details from frontend
    const {username, fullname, email, password} = req.body
    //console.log("username: ", username)
    //console.log("fullname: ", fullname)
    //console.log("email: ", email)
    //console.log("password: ", password)

    // Empty field check
    if (
        [username, fullname, email, password].some((field) => field?.trim() === "")
    )
    {
        throw new apiError(400, "All fields are required!")
    }


    // user existence check
    const existingUser = await User.findOne({
        $or: [{username}, {email}]
    })

    if(existingUser) {
        throw new apiError(409, "Username or Email already exists, Please try with another username or email...")
    }
    console.log(req.files)


    // Avatar/Image insertion and validation
    const avatarInLocalPath = req.files?.avatar[0]?.path
    //const coverImageInLocalPath = req.files?.coverImage[0]?.path
    let coverImageInLocalPath 

    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageInLocalPath = req.files.coverImage[0].path
    }

    // validation check for "Avatar" field
    if (!avatarInLocalPath) {
        throw new apiError(400, "Avatar should not empty!")
    }


    // Upload Avatar and CoverImage to Cloudinary
    const avatar = await uploadOnCloudinary(avatarInLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageInLocalPath)
    // avatar validation check
    if(!avatar) {
        throw new apiError(400, "Avatar file is required!")
    }


    // Store data into Database 
    const user = await User.create ({
        username: username.toLowerCase(),
        fullname,
        email,
        password, 
        avatar: avatar.url,
        coverImage: coverImage?.url || ""
    })

 
    // Also hide password and refresh token field 
    const createdUser = await User.findById(user._id).select ("-password -refreshToken")

    // Checking "user" store into database or not
    if(!createdUser) {
        throw new apiError(500, "Error while registering the user")
    }


    // returning user response
    return res.status(201).json(
        new apiResponse(200, createdUser, "You have successfully registered...")
    )

})
// Register end


// Login start
const userLogin = asyncHandler(async(req, res) => {

})


export {userRegister, userLogin}