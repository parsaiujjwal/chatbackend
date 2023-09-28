import express from "express";
import { signIn, signUp } from "../controller/user.controller.js";
import multer from "multer";
const uploads = multer({ dest: 'public/images' })
const route = express.Router();

    route.post("/signup",
    uploads.single("thumbnailFile"), signUp),
    route.post("/signIn", signIn);


export default route;