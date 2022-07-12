import Joi, { func } from "joi";

async function registerValidation(data) {
  const schema = Joi.object({
    email: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
}
async function loginValidation(data) {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
}

export default {
  registerValidation,
  loginValidation
}
