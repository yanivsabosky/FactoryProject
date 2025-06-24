const departments = require("../models/Department");
const employees = require("../models/Employee");
const employee_shifts = require("../models/EmployeeShift");

// Repository functions for the Departments collection
const getAll = async()=>{
    return await departments.find();
}
// Get a specific department by ID
const getById = async(id) =>{
    return await departments.findById(id)
}

// Create a new department
const addDepartment = async(department)=>{
      return await departments.create(department)
}

// Update department data
const updateDepartment = async(id, newData) => {
    return await departments.findByIdAndUpdate(id, newData, { new: true });
}

// Delete department
const deleteDepartment = async(id) => {
      // 1. Find all employees in the department
        const departmentEmployees = await employees.find({ DepartmentID: id });
        
       // 2. Delete their shift assignments
        for (const employee of departmentEmployees) {
            await employee_shifts.deleteMany({ employeeId: employee._id });
        }
        
         // 3. Delete the employees themselves
        await employees.deleteMany({ DepartmentID: id });
        
        // 4. Delete the department
        return await departments.findByIdAndDelete(id);
    
    
}

// Update the manager of a department
const updateManager = async (departmentId, managerId) => {
  return await departments.findByIdAndUpdate(
    departmentId,
    { Manager: managerId },
    { new: true }
  );
};

// Exports
module.exports = {
    getAll,
    getById,
    updateDepartment ,
    deleteDepartment ,
    addDepartment,
    updateManager
    


}