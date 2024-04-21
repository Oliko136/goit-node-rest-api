import bcrypt from 'bcrypt';
import { controllerDecorator } from "../helpers/controllerDecorator.js";
import { findUser, registerUser } from "../services/authServices.js";
import HttpError from "../helpers/HttpError.js";

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

