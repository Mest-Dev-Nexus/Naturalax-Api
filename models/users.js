import { Schema, model } from "mongoose";

const userSchema = new Schema (
    {
    userName: {type: String, required: true, unique: true},
    email: {type: String, required: true},
    password: {type: String, required: true, unique: true},
    role: {type: String, default: 'staff', enum:[ 'staff', 'manager', 'admin', 'superadmin']}
},
 {timestamps: true}
);

export const userModel = model('User', userSchema);
