const Joi = require('joi');

const userSchema = Joi.object({
    //id: Joi.string().optional(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().min(2).max(100).optional(),
    phone: Joi.string().pattern(/^[0-9]{10,15}$/).optional(),
    profileImage: Joi.string().uri().optional(),
    isDeleted: Joi.boolean().optional()
});


const validateUserData = (data) => {
  return userSchema.validate(data, {
    abortEarly: true, 
    stripUnknown: true,
  });
};

const emailSchema = Joi.object({
  email: Joi.string().email().required()
});

const validateEmail = (data) => {
  return emailSchema.validate(data, {
    abortEarly: true,
    stripUnknown: true,
  });
};

module.exports = {
  userSchema,
  emailSchema,
  validateUserData,
  validateEmail
};