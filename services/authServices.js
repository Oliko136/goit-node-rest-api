import User from './models/usersModel.js';

export const findUser = ({ email }) => {
    return User.findOne({ email });
}

export const registerUser = ({ email, password }) => {
    return User.create({ email, password });
}