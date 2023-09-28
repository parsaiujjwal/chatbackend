import mongoose from "mongoose";
const NewUserSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            require: true,
        },
        lastName: {
            type: String,
            require: true,
        },  
        email: {
            type: String,
            require: true
        },  
        password: {
            type: String,
            require:true,   
        },
        thumbnailFile:{
            type:String,
        }
    }
)
const User = mongoose.model('newuser', NewUserSchema);
export default User;