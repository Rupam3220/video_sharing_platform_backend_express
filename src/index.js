import app from "./app.js";
import connectDB from "./db/dbConfig.js";
import dotenv from "dotenv";
dotenv.config({path: './.env'})

const port = process.env.PORT

connectDB()

// Exception handle using then-catch for server
.then(() => {
    app.listen(port, () => {
        console.log(`Server is running at port: ${port}`)
    })
})

.catch((error) => {
    console.log("Server connection failed", error)
})

