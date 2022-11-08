const { getEmployees, createEmployee, removeEmployeeById, updateEmployeeById, getEmployeeById } = require('../controller/employee');
const express = require('express')
// get route from express
const router = express.Router()

// middleware
const validator = require('../middleware/validator');
const singleFileUpload = require('../middleware/singleFileUpload');
// for get all employees
router.get('/getEmployees', getEmployees)
// for create new employee
router.post('/createEmployee',[singleFileUpload,validator('EmployeeSchema')],createEmployee)
// for update delete status employee
router.delete('/removeEmployeeById/:id', removeEmployeeById)
// for update employee by id
router.put('/updateEmployeeById/:id',[singleFileUpload], updateEmployeeById)
// for get employee by id
router.get('/getEmployeeById/:id', getEmployeeById)

module.exports = router

