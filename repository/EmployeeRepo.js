const employees = require("../models/Employee");
const employee_shifts = require("../models/EmployeeShift");

// functions 
const getAll = async()=>{
    return await employees.find();
}

const getById = async(id) =>{
    return await employees.findById(id)
}

const getByDepartmentId = async (departmentId) => {
    return await employees.find({DepartmentID: departmentId})
}

const addEmployee = async(employee)=>{
      return await employees.create(employee)
}
const updateEmployee = async(id,nEmployee)=>{
        return await employees.findByIdAndUpdate(id,nEmployee, { new: true })
    
}

const deleteEmployee = async(id) => {     
        await employee_shifts.deleteMany({ employeeId: id });
        return await employees.findByIdAndDelete(id);

}

module.exports = {
    getAll,
    addEmployee ,
    updateEmployee ,
    deleteEmployee,
    getById,
    getByDepartmentId
}