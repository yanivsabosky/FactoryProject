const departments = require("../models/Department");
const employees = require("../models/Employee");
const employee_shifts = require("../models/EmployeeShift");

// functions 
const getAll = async()=>{
    return await departments.find();
}

const getById = async(id) =>{
    return await departments.findById(id)
}

const addDepartment = async(department)=>{
      return await departments.create(department)
}
const updateDepartment = async(id, newData) => {
    return await departments.findByIdAndUpdate(id, newData, { new: true });
}

const deleteDepartment = async(id) => {
        const departmentEmployees = await employees.find({ DepartmentID: id });
        
       
        for (const employee of departmentEmployees) {
            await employee_shifts.deleteMany({ employeeId: employee._id });
        }
        
       
        await employees.deleteMany({ DepartmentID: id });
        
        return await departments.findByIdAndDelete(id);
    
    
}
module.exports = {
    getAll,
    getById,
    updateDepartment ,
    deleteDepartment ,
    addDepartment


}