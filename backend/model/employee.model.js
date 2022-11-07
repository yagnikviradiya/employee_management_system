const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    first_name: {
        type: String,
        require: true
    },
    last_name: {
        type: String,
        require: true
    },
    email: {    
        type: String,
        require: true
    },
    profile_pic: {
        type: String,
        require: true
    },
    employee_type: {
        type: String,
        require: true
    },
    DOB: {
        type: Date,
        require: true
    },
    hobbies: {
        type: String,
        require: true
    },
    is_deleted: {
        type: Boolean,
        default:false
    },
}, {
    timestamps: true
});
const Employees = mongoose.model('employees', EmployeeSchema);
module.exports = Employees;