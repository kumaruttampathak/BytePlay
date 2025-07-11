import mongoose, {Schema, model} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    fullname: {
        type: String,
        required: true, 
        trim: true,
        index: true,
    },
    avatar:{
        type: String, // cloudinary url
        required: true
    },
    coverImage:{
        tyep: String,
    },
    watchHistory:[
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    refreshToken : {
        type: String
    }
}, {timestamps: true})

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next(); // encrypt only when only password field being passed
    this.password = bcrypt.hash.apply(this.password, 10)
    next()
}) // password encryption by using mongoose hooks middleware



export const User = model("User",userSchema)