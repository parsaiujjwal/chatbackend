import express from 'express';
import multer from 'multer';
import path from 'path';
import  { getImage }  from '../controller/getfile.js'; 

import { signUp, signIn } from '../controller/user.controller.js';

const router = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,'./public');
    },
    filename: (req, file, cb) => {
        const fileType = file.originalname.split('.').pop();
        const newFileName = 'thumbnail-' + Date.now() + '.' + fileType;
        cb(null, newFileName);
    },
});

const upload = multer({ storage: storage });

router.post('/signup', upload.single('thumbnailFile'), signUp);
router.get('/public/:thumbnail', getImage); 
router.post('/signin', signIn);

export default router;
