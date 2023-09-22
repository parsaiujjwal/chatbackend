import express, { Router } from 'express';
import { CurrentUser, reciveMassage, sendMassage } from '../controller/user.controller.js';

const route = express.Router();

route.post("/send", sendMassage);
route.post("/recive", reciveMassage);
route.post("/count",CurrentUser);
export default route;