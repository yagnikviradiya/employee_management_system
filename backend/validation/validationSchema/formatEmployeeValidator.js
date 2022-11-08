const Joi = require('joi');

const EmployeeSchema = Joi.object().keys({
    first_name: Joi.string().required().description('first name'),
    last_name: Joi.string().required().description('last_name'),
    email: Joi.string().email().required().description('email'),
    // profile_pic: Joi.string().required().description('first name'),
    employee_type: Joi.string().required().description('employee_type'),
    DOB: Joi.date().required().description('DOB'),
    hobbies: Joi.string().required().description('hobbies'),
})
module.exports={EmployeeSchema}