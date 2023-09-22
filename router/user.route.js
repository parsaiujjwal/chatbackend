import express from "express";
import { signIn,signUp  } from "../controller/user.controller.js";

const route= express.Router();

route.post("/signup",signUp);
route.post("/signIn",signIn);


export default route;