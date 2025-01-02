import cookieParser from "cookie-parser";
import cors from 'cors'
import express from 'express'

const app = express()

app.use(cors({
    path:process.env.COROS_LINK,
    credentials:true
}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true , limit:"16kb"}))
app.use(express.static("Public"))
app.use(cookieParser())



export {app}