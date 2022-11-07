const createHttpError = require('http-errors')
//* Include joi to check error type 
const Joi = require('joi')
//* Include all validators
const Validators = require('../validation')

module.exports = function(validator) {
    return async function(req, res, next) {
        try {
            const validated = await Validators[validator].validateAsync(req.body)
            req.body = validated
            next()
        } catch (err) {
            if(err.isJoi) 
            res.status(400).json({
                success: false,
                data: null,
                message: err.message
            })
        }
    }
}