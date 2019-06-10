import mongoose, { Schema } from "mongoose";

const UserSchema: Schema = new Schema({
    username: String,
    password: String,
    email: String,
    createdAt: String
});

export const User = mongoose.model('User', UserSchema);
