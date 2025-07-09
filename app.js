import express from 'express'
import cookieParser from 'cookie-parser'
import cors from "cors"

const app = express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

// for app configuration we use .use properties

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true, limit:"16kb"})) // use to add symbol or sign to encode the url
app.use(express.static("public")) // to store assets that are publicly available
app.use(cookieParser()) // made some CRUD operation on browsers cookies which is only accessible by servers

export {app}