import mongoose from 'mongoose';
import { type } from 'os';

const userSchema = new mongoose.Schema(
    {
        UserFirstName:{
            type: String,
            required: true
        },
        UserLastName:{
            type: String,
            required: true
        },
        UserEmail:{
            type: String,
            required: true
        },
        Username:{
            type: String,
            required: true
        },
        UserPassword: {
            type: String, 
            required: true
        },
        UserImage:{
            type: String,
            required: true
        },
    },
    {
        timestamps: true
    }
);

const User = mongoose.model('User',userSchema);

export default User;