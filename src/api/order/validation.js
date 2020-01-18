import Joi from 'joi'

const schema = Joi.object().keys({ 
  status: Joi.string().required(),
}); 

export const orderValidation = order => {
  const {error} = Joi.validate(order, schema); 
  if (!!error) {
    return error;
  }
};
