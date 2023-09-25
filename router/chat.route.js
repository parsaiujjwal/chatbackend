import express, { Router } from 'express';
import { CurrentUser, fatchMassage, reciveMassage, sendMassage } from '../controller/user.controller.js';

const route = express.Router();

route.post("/send", sendMassage);
route.post("/recive", reciveMassage);
route.post("/count",CurrentUser);
route.get('/getMessages',fatchMassage);
export default route;