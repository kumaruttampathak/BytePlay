// require('dotenv').config({path : './env'})
import dotenv from "dotenv"
import connectDB from "./db/index.js";
import { app } from "../app.js";

dotenv.config({
    path: '/.env'
})
connectDB() // return promise if any async code complates
.then(() => {
    app.listen(process.env.PORT || 8000, ()=> {
        console.log(`Server is running at port ${process.env.PORT}`);
    app.on("error", (error)=>{
            console.log("ERROR while connecting to server", error);
            throw error
        })
    })
})
.catch((err)=>{
    console.log("MONGO DB connection error", err);
})



















/*
import express from 'express'
const app = express()

;(async ()=> {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error)=>{
            console.log("ERROR App is not able to talk to express database", error);
            throw error            
        })
        app.listen(process.env.PORT, ()=> {
            console.log(`App is listning on port ${process.env.PORT}`);
            
        })
    } catch (error) {
        console.error("ERROR", error);
        throw err
        
    }
})() //good practice to start iife with semicolon, a purpose of clean code 

*/