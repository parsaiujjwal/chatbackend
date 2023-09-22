import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import UserRoute from "./router/user.route.js"
import ChatRoute from "./router/chat.route.js"
const app = express();

mongoose.connect("mongodb+srv://ujjwalparsai109:ujjwal%406660@cluster0.hg73qjv.mongodb.net/?retryWrites=true&w=majority");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(cors());

app.use('/user',UserRoute);
app.use('/chat',ChatRoute);

app.listen(3000,()=>{
console.log("server Started .....");
});