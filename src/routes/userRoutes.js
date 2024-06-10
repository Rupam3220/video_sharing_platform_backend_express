import { Router } from "express";
import { userLogin, userLogout, userRegister } from "../controllers/userController.js";
import {upload} from "../middlewares/multerMiddleware.js"
import verifyJWT from "../middlewares/authMiddleware.js";

const router = Router()

// Public routes
router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },

        {
            name: "coverImage",
            maxCount: 1
        }
    ]),    
    userRegister
)


router.route("/login").post(userLogin)


// Secured routes
router.route("/logout").post(verifyJWT, userLogout)

export default router