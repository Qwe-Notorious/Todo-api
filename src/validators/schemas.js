const Joi = require('joi');

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

const todoSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow('', null),
  status: Joi.string().valid('pending', 'in progress', 'completed')
});

const todoUpdateSchema = Joi.object({
  status: Joi.string().valid('pending', 'in progress', 'completed').required()
});

module.exports = {
  registerSchema,
  loginSchema,
  todoSchema,
  todoUpdateSchema
};