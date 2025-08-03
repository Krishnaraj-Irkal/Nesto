import mongoose, { mongo } from "mongoose";
import { type } from "os";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unque: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: 'https://res.cloudinary.com/dxq1j3k5h/image/upload/v1709301234/avatars/avatar-1.png'
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;