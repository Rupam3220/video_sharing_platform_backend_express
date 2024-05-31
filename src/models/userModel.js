import mongoose from "mongoose";

// JWT import
import jwt from "jsonwebtoken";

// Bcrypt import 
import bcrypt from "bcrypt";



const userSchema = new Schema({

    username: {
        type:String, 
        required: true, 
        unique: true, 
        lowercase: true, 
        trim: true, 
        index: true
    },

    fullname: {
        type:String, 
        required: true,  
        trim: true, 
        index: true
    },

    email: {
        type:String, 
        required: true, 
        unique: true, 
        lowercase: true, 
        trim: true, 
    },

    password: {
        type:String, 
        required: [true, 'Password is required']
    },

    avatar: {
        type:String, 
        required: true, 
    },

    coverImage: {
        type:String, 
    },

    refreshToken: {
        type:String, 
    },

    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ]

}, {timestamps: true})


userSchema.pre("save", async(next) => {
    if(!this.isModified("password")) 
        return next()

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async (password) => {
    return await bcrypt.compare(password, this.password)
}



export const User = mongoose.model("User", userSchema)