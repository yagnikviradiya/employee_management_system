const employeeServices = require('../services/');

//#region create employee 
const createEmployee = async (req, res) => {
    try {
        req.body.profile_pic = req.fileurl
        let employee = await employeeServices.getEmployeeByKey({ is_deleted: false, email: req.body.email });
        if (employee) {
            return res.status(200).json({
                success: false,
                data: null,
                message: "employee already exist"
            })
        } else {
            const createEmployee = await employeeServices.createEmployee(req.body)
            if (createEmployee) {
                res.status(200).json({
                    success: true,
                    data: createEmployee,
                    message: "employee created"
                })
            } else {
                res.status(200).json({
                    success: false,
                    data: null,
                    message: "error while creating employee"
                })
            }
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            data: null,
            message: err.message
        })
    }
}
//#endregion

//#region create employee 
const updateEmployeeById = async (req, res) => {
    try {
        if (req?.params?.id) {
            req.body.profile_pic = req.fileurl
            const filter = {
                is_deleted: false,
                _id: req.params.id
            }
            let updatedEmployee = await employeeServices.updateEmployeeById(filter, req.body, res);
            if (updatedEmployee?.nModified == 1) {
                return res.status(200).json({
                    success: true,
                    data: createEmployee,
                    message: "employee updated"
                });
            } else {
                res.status(200).json({
                    success: false,
                    data: null,
                    message: 'employee not updated'
                })
            }
        } else {
            res.status(200).json({
                success: false,
                data: null,
                message: 'employee id required'
            })
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            data: null,
            message: err.message
        })
    }
}
//#endregion

//#region get all employee 
const getEmployees = async (req, res) => {
    try {
        await employeeServices.getAllEmployees(res)

    } catch (err) {
        return res.status(500).json({
            success: false,
            data: null,
            message: err.message
        })
    }
}
//#endregion

//#region get single employee by id 
const getEmployeeById = async (req, res) => {
    try {
        if (req?.params?.id) {
            let employee = await employeeServices.getEmployeeByKey({ is_deleted: false, _id: req.params?.id });
            if (employee) {
                res.status(200).json({
                    success: true,
                    data: employee,
                    message: "get employee"
                });
            } else {
                res.status(200).json({
                    success: false,
                    data: null,
                    message: "employee no exist"
                });
            }
        } else {
            res.status(200).json({
                success: false,
                data: null,
                message: 'employee id required'
            })
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            data: null,
            message: err.message
        })
    }

}
//#endregion

//#region remove employee 
const removeEmployeeById = async (req, res) => {
    try {
        if (req?.params?.id) {
            const removeEmployee = await employeeServices.removeEmployeeById(req.params.id)
            res.status(200).json({
                success: true,
                data: null,
                message: "employee deleted"
            });
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            data: null,
            message: err.message
        })
    }
}
//#endregion

module.exports = {
    createEmployee,
    getEmployees,
    removeEmployeeById,
    updateEmployeeById,
    getEmployeeById,
}
