import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import gravatar from 'gravatar';
import Jimp from 'jimp';
import path from 'path';
import fs from 'fs/promises';
import { nanoid } from 'nanoid';
import { controllerDecorator } from "../helpers/controllerDecorator.js";
import sendEmail from "../helpers/sendEmail.js";
import { findUser, registerUser, updateUser } from "../services/authServices.js";
import HttpError from "../helpers/HttpError.js";

const { JWT_SECRET, BASE_URL } = process.env;

const avatarsDir = path.resolve('public', 'avatars');

export const register = controllerDecorator(async (req, res) => {
    const { email, password } = req.body;
    const user = await findUser({ email });

    if (user) {
        throw HttpError(409, "Email in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const avatarURL = gravatar.url(email);

    const verificationToken = nanoid();

    const result = await registerUser({ ...req.body, password: hashPassword, avatarURL, verificationToken });
    
    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click to verify email</a>`
    }

    await sendEmail(verifyEmail);

    res.status(201).json({
        user: {
            email: result.email,
            subscription: result.subscription,
            avatarURL: result.avatarURL
        }
    });
})

export const verify = controllerDecorator(async (req, res) => {
    const { verificationToken } = req.params;

    const user = await findUser({ verificationToken });
    
    if (!user) {
        throw HttpError(404, "User not found");
    }

    await updateUser({ _id: user._id }, { verify: true, verificationToken: null });

    res.json({
        message: "Verification successful"
    })
})

export const login = controllerDecorator(async (req, res) => {
    const { email, password } = req.body;
    const user = await findUser({ email });
    if (!user) {
        throw HttpError(401, "Email or password is wrong");
    }

    if (!user.verify) {
        throw HttpError(401, "Please, verify your email");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        throw HttpError(401, "Email or password is wrong");
    }

    const payload = { id: user._id };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
    await updateUser({ _id: user._id }, { token });

    res.json({
        token,
        user: {
            email: user.email,
            subscription: user.subscription
        }
    })

})

export const updateSubscription = controllerDecorator(async (req, res) => {
    const { subscription } = req.body;
    const { email } = req.user;
    const user = await findUser({ email });
    if (!user) {
        throw HttpError(404, "User not found");
    }

    const result = await updateUser({ email }, { subscription });

    res.json(result);
})

export const updateAvatar = controllerDecorator(async (req, res) => {
    if (!req.file) {
        throw HttpError(400, "No file uploaded");
    }
    const { _id, email } = req.user;
    const { path: tempUpload, filename } = req.file;
    const newFileName = `${email}_${filename}`;
    const resultUpload = path.join(avatarsDir, newFileName);

    Jimp.read(tempUpload, (err, img) => {
        if (err) throw err;
        img.resize(250, 250).quality(60).grayscale().write(resultUpload);
    })
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join('avatars', newFileName);
    await updateUser({ _id }, { avatarURL });
    
    res.json({ avatarURL });
})

export const getCurrentUser = controllerDecorator(async (req, res) => {
    const { email, subscription } = req.user;

    res.json({
        email,
        subscription
    })
})

export const logout = controllerDecorator(async (req, res) => {
    const { _id } = req.user;
    await updateUser({ _id }, { token: null });
    
    res.status(204);
})

