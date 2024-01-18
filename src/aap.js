import express from "express"
import cors from "cors"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))


//routes import
import userRouter from './routes/userRoutes.js'

// app.use("/api/user",require("./routes/userRoutes"));
app.use("/.netlify/functions/api", userRouter)

// http://localhost:8000/api/v1/users/register

export { app }