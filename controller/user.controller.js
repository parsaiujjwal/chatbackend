import User from "../model/user.model.js";
import Message from "../model/chat.model.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import multer from "multer";
export const signUp = async (req, res, next) => {
    try {
        console.log(req.body)
        
        var file = req.file.filename;
        console.log(file)
        const { firstName, lastName, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(10));
        const user = await User.create({
            thumbnailFile:file,
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });
        return res.status(200).json({ user, message: 'Sign up success', status: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error', status: false });
    }
};

export const signIn = async (req, res, next) => {
    try {
        console.log(req.body)
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid1 credentials', status: false });
        }
        const status = await bcrypt.compare(password, user.password);
        if (!status) {
            return res.status(401).json({ message: 'Invalid credentials', status: false });
        }
        const token = jwt.sign({ subject: user.email }, 'ujjwalparsai');
        return res.status(200).json({ message: 'Sign In Success', user: user, token: token, status: true });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal Server Error', status: false });
    }
};
export const tokenVerify = (req, res, next) => {
    try {
        let token = req.Headers.authorization;
        if (!token) throw Error();
        jwt.verify(token, 'ujjwalparsai')
        next();
    } catch (err) {
        res.status(500).json({ massage: "internal server error", status: false });
    }
};
export const reciveMassage = async (request, response, next) => {
    console.log(request.body)
    try {
        const messages = await Message.find().sort('-createdAt');

        console.log(messages)
        return response.status(200).json({ massage: "Massage recive sucessfully", status: true });
    } catch (error) {
        return response.status(500).json({ massage: "Internet server error", status: false });
    }
};
export const sendMassage = async (request, response, next) => {
    const { textmassage, sender, receiver } = request.body;
    console.log(request.body);
    try {
        const message = new Message({ textmassage, sender, receiver });
        await message.save();
        return response.status(200).json({ massage: "Massage Sent Sucessfully" });
    } catch (error) {
        console.log(error)
        return response.status(500).json({ massage: "Internet server error", status: false });
    }
};
export const CurrentUser = async (req, res, next) => {
    try {
        const user = await User.find();
        if (user) {
            return res.status(200).json({ user: user, status: true })
        }
        else {
            return res.status(401).json({ error: "not found", status: false })
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal server error", status: false })
    }
}
export const fatchMassage = async (req, res, next) => {
    try {
        const { receiverId, senderId } = req.query;
        const messages = await Message.find({
            $or: [
                { sender: senderId, receiver: receiverId },
                { sender: receiverId, receiver: senderId },
            ],
        });
        res.json({ messages });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
