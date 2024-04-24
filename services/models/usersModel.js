import { Schema, model } from "mongoose";
import handleMongooseError from "../../hooks/handleMongooseError.js";
import subscriptionTypes from "../../constants/subscription.js"

const usersSchema = new Schema(
    {
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
        },
        subscription: {
            type: String,
            enum: subscriptionTypes,
            default: "starter",
        },
        avatarURL: String,
        token: {
            type: String,
            default: null,
        },
    },
    { versionKey: false }
)

usersSchema.post('save', handleMongooseError);

const User = model('user', usersSchema);

export default User;