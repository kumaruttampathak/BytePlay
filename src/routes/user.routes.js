import { Router } from "express";
import {registerUser} from "../controllers/user.controller.js"

const router = Router()

router.route("/register").post(registerUser) //url should be like  http://localhost:8000/api/v1/users/register 
// router.route("/login").post(login) // and or http://localhost:8000/api/v1/users/login

export default router