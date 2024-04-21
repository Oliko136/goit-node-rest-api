import express from 'express';
import { register } from '../controllers/authControllers.js';
import { registerSchema, loginSchema } from '../schemas/usersSchemas.js';
import validateBody from '../middlewares/validateBody.js';

const authRouter = express.Router();

authRouter.post('/register', validateBody(registerSchema), register);

authRouter.post('/login', validateBody(loginSchema));

export default authRouter;