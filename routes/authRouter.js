import express from 'express';
import { register, login, updateSubscription } from '../controllers/authControllers.js';
import { registerSchema, loginSchema, updateSubscriptionSchema } from '../schemas/usersSchemas.js';
import validateBody from '../middlewares/validateBody.js';

const authRouter = express.Router();

authRouter.post('/register', validateBody(registerSchema), register);

authRouter.post('/login', validateBody(loginSchema), login);

authRouter.patch('/', validateBody(updateSubscriptionSchema), updateSubscription);

export default authRouter;