import jwt from "jsonwebtoken";
import HttpError from "../helpers/HttpError.js";
import User from "../services/models/usersModel.js";

const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
    const { authorization = ""} = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
        next(HttpError(401, "Not authorized"));
    }

    try {
        const { id } = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(id);
        if (!user) {
            next(HttpError(401, "Not authorized"));
        }
        req.user = user;
        next();
    } catch {
        next(HttpError(401, "Not authorized"));
    }
}

export default authenticate;