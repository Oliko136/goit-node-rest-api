import Joi from 'joi';
import subscriptionTypes from '../constants/subscription.js';

export const registerSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
})

export const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
})

export const updateSubscriptionSchema = Joi.object({
    email: Joi.string().required(),
    subscription: Joi.string().valid(...subscriptionTypes).required()
})