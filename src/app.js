import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

// Import Routes
import userRouter from "./routes/userRoutes.js"

const app = express()

// CORS setup
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))


// JSON Data handle middleware
app.use(express.json({limit: "16kb"}))

// URL handle middleware
app.use(express.urlencoded({extended: true, limit: "16kb"}))

// File handling middleware
app.use(express.static("public"))

// set and access cookies to user-browser from server
app.use(cookieParser())


// Routes
app.use("/users", userRouter)


export default app