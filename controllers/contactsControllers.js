import { controllerDecorator } from "../helpers/controllerDecorator.js";
import { listContacts, getContactByFilter, removeContact, addContact, modifyContact, updateStatusContact } from "../services/contactsServices.js";
import HttpError from '../helpers/HttpError.js';

export const getAllContacts = controllerDecorator(async (req, res) => {
    const { _id: owner } = req.user;
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;
    const total = await listContacts({owner}).countDocuments();
    const result = await listContacts({ owner }, { skip, limit }).populate("owner", "email subscription");
        
    res.json({
        page,
        perPage: limit,
        total,
        contacts: result
    });
   
})

export const getOneContact = controllerDecorator(async (req, res) => {
    const { _id: owner } = req.user;
    const { id } = req.params;
    const result = await getContactByFilter({owner, _id: id}).populate("owner", "email subscription");
    if (!result) {
        throw HttpError(404, "Not found");
    }

    res.json(result);
})

export const deleteContact = controllerDecorator(async (req, res) => {
    const { _id: owner } = req.user;
    const { id } = req.params;
    const result = await removeContact({owner, _id: id}).populate("owner", "email subscription");
    if (!result) {
        throw HttpError(404, "Not found");
    }

    res.json(result);
})

export const createContact = controllerDecorator(async (req, res) => {
    const { _id: owner } = req.user;
    const result = await addContact({ ...req.body, owner });

    res.status(201).json(result);
})

export const updateContact = controllerDecorator(async (req, res) => {
    const { _id: owner } = req.user;
    const { id } = req.params;
    const result = await modifyContact({owner, _id: id}, req.body).populate("owner", "email subscription");
    if (!result) {
        throw HttpError(404, "Not found");
    }
    
    res.json(result);
})

export const updateStatus = controllerDecorator(async (req, res) => {
    const { _id: owner } = req.user;
    const { id } = req.params;
    const result = await updateStatusContact({owner, _id: id}, req.body).populate("owner", "email subscription");
    if (!result) {
        throw HttpError(404, "Not found");
    }

    res.json(result);
})
