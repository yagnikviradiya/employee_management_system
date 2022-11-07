const Joi = require('joi');

const EmployeeSchema = Joi.object().keys({
    first_name: Joi.string().required().description('first name'),
    last_name: Joi.string().required().description('first name'),
    email: Joi.string().email().required().description('first name'),
    // profile_pic: Joi.string().required().description('first name'),
    employee_type: Joi.string().required().description('first name'),
    // DOB: Joi.date().required().description('first name'),
    // hobbies: Joi.string().required().description('first name'),
})
module.exports={EmployeeSchema}