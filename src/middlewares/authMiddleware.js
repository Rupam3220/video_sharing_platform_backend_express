import { User } from "../models/userModel.js";
import apiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const verifyJWT = asyncHandler(async(req, res, next) => {

    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Brarer ", "")

        if(!token) {
            throw new apiError(401, "Unauthorized token request!")
        }
        
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
        if(!user) {
            throw new apiError(401, "Invalid Access token!")
        }
    
        req.user = user
        next()
    } catch (error) {
        throw new apiError(401, error?.message || "Invalid access token")
    }



})

export default verifyJWT