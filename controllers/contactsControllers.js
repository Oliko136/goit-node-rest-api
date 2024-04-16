import { controllerDecorator } from "../helpers/controllerDecorator.js";
import contactsService from "../services/contactsServices.js";
import HttpError from '../helpers/HttpError.js';
import { createContactSchema, updateContactSchema } from "../schemas/contactsSchemas.js";

export const getAllContacts = controllerDecorator(async (req, res) => {
        const result = await contactsService.listContacts();
        
        res.json(result);
   
})

export const getOneContact = controllerDecorator(async (req, res) => {
        const { id } = req.params;
        const result = await contactsService.getContactById(id);
        if (!result) {
            throw HttpError(404, "Not found");
        }

        res.json(result);
})

export const deleteContact = controllerDecorator(async (req, res) => {
        const { id } = req.params;
        const result = await contactsService.removeContact(id);
        if (!result) {
            throw HttpError(404, "Not found");
        }

        res.json(result);
})

export const createContact = controllerDecorator(async (req, res) => {
        const {error} = createContactSchema.validate(req.body);
        if (error) {
            throw HttpError(400, error.message);
        }
        const result = await contactsService.addContact(req.body);

        res.status(201).json(result);
})

export const updateContact = controllerDecorator(async (req, res) => {
        const { error } = updateContactSchema.validate(req.body);
        if (error) {
            throw HttpError(400, error.message);
        }
        if (!Object.entries(req.body).length) {
            throw HttpError(400, "Body must have at least one field");
        }
        const { id } = req.params;
        const result = await contactsService.updateContact(id, req.body);
        if (!result) {
            throw HttpError(404, "Not found");
        }

        res.json(result);
})
