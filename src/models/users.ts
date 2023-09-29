import {Schema, model} from 'mongoose';


const User = new Schema({
    name: {type: String, unique: true, required: true, maxlength: 13,  minlength: 3, trim: true},
    password: {type: String,  required: true,  minlength: 8 },
    rate: {type: Number, default: 0, min: 0},
    createdAt: {type: Date, default: Date.now()}
})

export const UserModel = model('User', User);
