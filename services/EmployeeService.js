// Import required repositories
const employee_repo =  require("../repository/EmployeeRepo");
const department_repo = require("../repository/DepartmentRepo");
const shift_repo = require("../repository/ShiftRepo");
const user_repo = require("../repository/UserRepo");
const employee_shift_repo = require("../repository/EmployeeShiftRepo");

// Employee Service Methods


//  Get all employees
const getAllEmployees = async()=>{
    try{
        return await employee_repo.getAll()

    }catch(error){
        console.log(error)
        throw error
    }

} 

// Get Employee By Id
const getEmployeeById = async(id)=>{
        try{
         
         return await employee_repo.getById(id)
        
    }catch(error){
        console.log(error)
        throw error
    }
} 


// Get all employees in a specific department
const getEmployeesByDepartment = async(departmentId)=>{
  
  try{
      return await employee_repo.getByDepartmentId(departmentId);
  }
  catch(error){
    console.log(error)
     throw error
  }

}

//  Add a new employee, assign to department and shifts, create user if needed
const addEmployee = async (data) => {
  try {
    const { First_Name, Last_Name, Start_Work_Year, DepartmentID, shifts, user } = data;

    const department = await department_repo.getById(DepartmentID);
    if (!department) throw new Error("Department not found");

    const newEmployee = await employee_repo.addEmployee({
      First_Name,
      Last_Name,
      Start_Work_Year,
      DepartmentID
    });

    if (shifts && shifts.length > 0) {
      for (const shiftId of shifts) {
        await shift_repo.addEmployeeToShift(shiftId, newEmployee._id);
      }
    }

    if (user) {
      await user_repo.addUser({
        ...user,
        employeeId: newEmployee._id
      });
    }

    return newEmployee;

  } catch (error) {
    console.log(error);
    throw error;
  }
};
 
// Update employee by ID
const updateEmployee = async(id, data)=>{
        try{
            return await employee_repo.updateEmployee(id,data)
        
    }catch(error){
        console.log(error)
        throw error
    }
}

// Delete an employee and related shift assignments
const deleteEmployee = async(id) =>{
        try{
            await employee_shift_repo.deleteByEmployeeId(id);
            return   await employee_repo.deleteEmployee(id)
        
    }catch(error){
        console.log(error)
        throw error
    }
} 


// Assign an employee to a department
const assignDepartment = async(employeeId, departmentId) => {
  try {
    const department = await department_repo.getById(departmentId);
    if (!department) throw new Error("Department not found");

    return await employee_repo.updateEmployee(employeeId, { DepartmentID: departmentId });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Assign a shift to an employee
const assignShift = async(employeeId, shiftId) => {
  try {
    const employee = await employee_repo.getById(employeeId);
    if (!employee) throw new Error("Employee not found");

    const shift = await shift_repo.getByid(shiftId);
    if (!shift) throw new Error("Shift not found");

    return await shift_repo.addEmployeeToShift(shiftId, employeeId);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Get all employees not in a specific department
const getEmployeesNotInDepartment = async (departmentId) => {
  return await employee_repo.getEmployeesNotInDepartment(departmentId);
};


// Exports
module.exports = {
    getAllEmployees ,
    getEmployeeById ,
    addEmployee ,
    updateEmployee , 
    deleteEmployee,
    assignDepartment,
    assignShift,
    getEmployeesNotInDepartment,
    getEmployeesByDepartment
}
