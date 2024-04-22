import Contact from './models/contactsModel.js';

export const listContacts = (filter, pagination) => {
    return Contact.find(filter, "", pagination);
};

export const getContactByFilter = (filter) => {
    return Contact.findOne(filter);
}

export const removeContact = (filter) => {
    return Contact.findOneAndDelete(filter);
}

export const addContact = ({ name, email, phone, owner }) => {
    return Contact.create({ name, email, phone, owner });
}

export const modifyContact = (filter, body) => {
    return Contact.findOneAndUpdate(filter, body, { new: true });
}

export const updateStatusContact = (filter, { favorite }) => {
    return Contact.findOneAndUpdate(filter, { favorite }, { new: true });
}