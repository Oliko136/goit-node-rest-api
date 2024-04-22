import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { controllerDecorator } from "../helpers/controllerDecorator.js";
import { findUser, registerUser, modifySubscription } from "../services/authServices.js";
import HttpError from "../helpers/HttpError.js";

const { JWT_SECRET } = process.env;

export const register = controllerDecorator(async (req, res) => {
    const { email, password } = req.body;
    const user = await findUser({ email });

    if (user) {
        throw HttpError(409, "Email in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const result = await registerUser({...req.body, password: hashPassword});

    res.status(201).json({
        user: {
            email: result.email,
            subscription: result.subscription
        }
    });
})

export const login = controllerDecorator(async (req, res) => {
    const { email, password } = req.body;
    const user = await findUser({ email });
    if (!user) {
        throw HttpError(401, "Email or password is wrong");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        throw HttpError(401, "Email or password is wrong");
    }

    const payload = { id: user._id };

    const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "23h"});

    res.json({
        token,
        user: {
            email: user.email,
            subscription: user.subscription
        }
    })

})

export const updateSubscription = controllerDecorator(async (req, res) => {
    const { email, subscription } = req.body;
    const user = await findUser({ email });
    if (!user) {
        throw HttpError(404, "User not found");
    }

    const result = await modifySubscription({ email }, { subscription });

    res.json(result);
})

