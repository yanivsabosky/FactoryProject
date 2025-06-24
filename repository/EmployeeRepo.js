const employees = require("../models/Employee");
const employee_shifts = require("../models/EmployeeShift");

// Repository methods for the Employees collection

// Get all employees from the database
const getAll = async()=>{
    return await employees.find();
}

//  Get a specific employee by their ID
const getById = async(id) =>{
    return await employees.findById(id)
}

// Get all employees that belong to a specific department
const getByDepartmentId = async (departmentId) => {
    return await employees.find({DepartmentID: departmentId})
}

// Add a new employee to the collection
const addEmployee = async(employee)=>{
      return await employees.create(employee)
}
// Update employee data by ID
const updateEmployee = async(id,nEmployee)=>{
        return await employees.findByIdAndUpdate(id,nEmployee, { new: true })
    
}
// Delete an employee and remove all their shift assignments
const deleteEmployee = async(id) => {     
        await employee_shifts.deleteMany({ employeeId: id });
        return await employees.findByIdAndDelete(id);

}

// Get all employees that are NOT in the specified department
const getEmployeesNotInDepartment = async (departmentId) => {
  return await employees.find({ DepartmentID: { $ne: departmentId } });
};

// Exports
module.exports = {
    getAll,
    addEmployee ,
    updateEmployee ,
    deleteEmployee,
    getById,
    getByDepartmentId,
    getEmployeesNotInDepartment
}