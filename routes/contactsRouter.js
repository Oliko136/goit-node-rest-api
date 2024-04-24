import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatus
} from "../controllers/contactsControllers.js";
import { createContactSchema, updateContactSchema, updateStatusSchema } from "../schemas/contactsSchemas.js";
import validateBody from "../middlewares/validateBody.js";
import validateId from "../middlewares/validateId.js";
import authenticate from "../middlewares/authenticate.js";

const contactsRouter = express.Router();

contactsRouter.get("/", authenticate, getAllContacts);

contactsRouter.get("/:id", authenticate, validateId, getOneContact);

contactsRouter.delete("/:id", authenticate, validateId, deleteContact);

contactsRouter.post("/", authenticate, validateBody(createContactSchema), createContact);

contactsRouter.put("/:id", authenticate, validateId, validateBody(updateContactSchema), updateContact);

contactsRouter.patch("/:id/favorite", authenticate, validateId, validateBody(updateStatusSchema), updateStatus);

export default contactsRouter;
