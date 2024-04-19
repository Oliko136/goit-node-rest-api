import { controllerDecorator } from "../helpers/controllerDecorator.js";
import { listContacts, getContactById, removeContact, addContact, modifyContact, updateStatusContact } from "../services/contactsServices.js";
import HttpError from '../helpers/HttpError.js';

export const getAllContacts = controllerDecorator(async (req, res) => {
    const result = await listContacts();
        
    res.json(result);
   
})

export const getOneContact = controllerDecorator(async (req, res) => {
    const { id } = req.params;
    const result = await getContactById(id);
    if (!result) {
        throw HttpError(404, "Not found");
    }

    res.json(result);
})

export const deleteContact = controllerDecorator(async (req, res) => {
    const { id } = req.params;
    const result = await removeContact(id);
    if (!result) {
        throw HttpError(404, "Not found");
    }

    res.json(result);
})

export const createContact = controllerDecorator(async (req, res) => {
    const result = await addContact(req.body);

    res.status(201).json(result);
})

export const updateContact = controllerDecorator(async (req, res) => {
    const { id } = req.params;
    const result = await modifyContact(id, req.body);
    if (!result) {
        throw HttpError(404, "Not found");
    }
    
    res.json(result);
})

export const updateStatus = controllerDecorator(async (req, res) => {
    const { id } = req.params;
    const result = await updateStatusContact(id, req.body);
    if (!result) {
        throw HttpError(404, "Not found");
    }

    res.json(result);
})
