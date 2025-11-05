const Joi = require('joi');

const publicationSchema = Joi.object({
    id: Joi.string().optional(),
    isSold: Joi.boolean().default(false),
    isPaused: Joi.boolean().default(false),
    isPremium: Joi.boolean().default(false),
    userEmail: Joi.string().email().required(),
    title: Joi.string().min(3).max(20).required(),
    city: Joi.string().min(2).max(100).required(),
    price: Joi.number().min(0).required(),
    category: Joi.string().valid('car', 'truck', 'pickup', 'motorcycle', 'piece').required(),
    brand: Joi.string().min(2).max(100).required(),
    model: Joi.string().min(2).max(100).required(),
    color: Joi.string().min(2).max(100).required(),
    year: Joi.number().integer().min(1900).max(new Date().getFullYear()).required(),
    images: Joi.array().items(Joi.string().uri()).min(1).max(8).required(),
    mileage: Joi.number().integer().min(0).optional(),
    version: Joi.string().min(1).max(25).optional(),
    doors: Joi.number().integer().min(1).max(9).optional(),
    typeFuel: Joi.string().min(2).max(30).optional(),
    transmision: Joi.string().min(2).max(30).optional(),
    description: Joi.string().max(1000).optional(),
    motorcycleType: Joi.string().min(2).max(100).optional(),
    engineDisplacement: Joi.number().integer().min(0).precision(1).optional(),
    motorcycleWheel: Joi.number().integer().min(10).max(30).optional(),
    pieceCondition: Joi.string().valid('new', 'used').optional(),
    compatibility: Joi.array().items(Joi.string().min(2).max(100)).optional(),
    
});


const validatePublicationData = (data) => {
  return publicationSchema.validate(data, {
    abortEarly: true, 
    stripUnknown: true,
  });
};


const paginationSchema = Joi.object({
    premiumCount: Joi.number().integer().min(0).optional(),
    nonPremiumCount: Joi.number().integer().min(0).optional(),
    lastPremiumKey: Joi.string().optional(),
    lastNonPremiumKey: Joi.string().optional(),
});

const validatePagination = (data) => {
  return paginationSchema.validate(data, {
    abortEarly: true,
    stripUnknown: true,
  });
};

const publicationIdSchema = Joi.object({
    id: Joi.string().required(),
})

const validatePublicationId = (data) => {
  return publicationIdSchema.validate(data, {
    abortEarly: true,
    stripUnknown: true,
  })
}

module.exports = {
  publicationSchema,
  paginationSchema,
  publicationIdSchema,
  validatePublicationData,
  validatePagination,
  validatePublicationId
};