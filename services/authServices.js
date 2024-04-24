import User from './models/usersModel.js';

export const findUser = ({ email }) => {
    return User.findOne({ email });
}

export const setToken = (id, { token }) => {
    return User.findByIdAndUpdate(id, { token }, { new: true });
}

export const registerUser = ({ email, password, avatarURL }) => {
    return User.create({ email, password, avatarURL });
}

export const modifySubscription = ({ email }, { subscription }) => {
    return User.findOneAndUpdate({ email }, { subscription }, { new: true });
}

export const modifyAvatar = (id, { avatarURL }) => {
    return User.findByIdAndUpdate(id, { avatarURL }, { new: true });
}