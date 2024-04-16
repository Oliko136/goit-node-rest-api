import Contact from './models/contactsModel.js';

export const listContacts = () => {
    return Contact.find();
};

export const getContactById = (contactId) => {
    return Contact.findOne({ _id: contactId });
}

export const removeContact = (contactId) => {
    return Contact.findByIdAndDelete({ _id: contactId });
}

export const addContact = ({ name, email, phone }) => {
    return Contact.create({ name, email, phone });
}

export const modifyContact = (contactId, body) => {
    return Contact.findByIdAndUpdate({ _id: contactId }, body, { new: true });
}