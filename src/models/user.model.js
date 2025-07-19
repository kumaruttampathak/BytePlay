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

userSchema.pre("save", async function (next) { // pre middleware function gives the power to perform some task(like encryption) before any event like save validation etc.
    if(!this.isModified("password")) return next(); // encrypt only when only password field being passed
    this.password = bcrypt.hash.apply(this.password, 10)
    next()
}) // password encryption by using mongoose hooks middleware

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken= function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET, 
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken= function(){
    return jwt.sign(
        {
        _id: this._id,
    }, 
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
    )
}


export const User = model("User",userSchema)