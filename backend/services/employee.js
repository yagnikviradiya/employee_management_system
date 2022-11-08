const Employees = require("../model/employee.model");

const getAllEmployees = async (res) => {
    try {
        const employees = await Employees.find({ is_deleted: false }).sort({ createdAt: -1 })
        if (employees && employees?.length) {
            return employees
        } else {
            res.status(200).json({
                success: false,
                data: employees,
                message: "not available any employee"
            })
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            success: false,
            data: null,
            message: err.message
        })
    }
}

const getEmployeeByKey = async (query) => {
    try {
        const employee = await Employees.findOne(query);
        return employee;
    } catch (err) {
        console.log(err.message);
    }
}

const createEmployee = async (employeeData, res) => {
    try {
        const employee = await Employees.create(employeeData);
        return employee;
    } catch (err) {
        console.log(err.message);
    }
}

const removeEmployeeById = async (employeeId, res) => {
    try {
        const employee = await Employees.updateOne({ _id: employeeId }, { is_deleted: true });
        return employee;
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            success: false,
            data: null,
            message: err.message
        })
    }
}

const updateEmployeeById = async (filter, updateData, res) => {
    try {
        const employee = await Employees.updateOne(filter, updateData);
        return employee;
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            success: false,
            data: null,
            message: err.message
        })
    }
}

module.exports = {
    getAllEmployees,
    getEmployeeByKey,
    createEmployee,
    updateEmployeeById,
    removeEmployeeById
}