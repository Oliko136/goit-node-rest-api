import User from './models/usersModel.js';

export const findUser = ({ email }) => {
    return User.findOne({ email });
}

export const setToken = (id, { token }) => {
    return User.findByIdAndUpdate(id, { token }, { new: true });
}

export const registerUser = ({ email, password }) => {
    return User.create({ email, password });
}

export const modifySubscription = ({ email }, { subscription }) => {
    return User.findOneAndUpdate({ email }, { subscription }, { new: true });
}