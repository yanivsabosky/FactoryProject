// Import required repositories
const department_repo = require("../repository/DepartmentRepo");
const employee_repo = require("../repository/EmployeeRepo");
const employee_shift_repo = require("../repository/EmployeeShiftRepo");

// Department Service Methods


// Get all departments with manager and employee info
const getAll = async () => {
  const departments = await department_repo.getAll();
  const result = [];

  for (const dept of departments) {
    const manager = await employee_repo.getById(dept.Manager);
    const employees = await employee_repo.getByDepartmentId(dept._id);

    result.push({
      id: dept._id,
      name: dept.Name,
      managerName: manager ? `${manager.First_Name} ${manager.Last_Name}` : "No Manager",
      employees: employees.map(emp => ({
        id: emp._id,
        fullName: `${emp.First_Name} ${emp.Last_Name}`
      }))
    });
  }

  return result;
};

//  Get a specific department by ID, including manager name
const getDepartmentById = async (id) => {
  try {
    const department = await department_repo.getById(id);
    if (!department) return null;

    let managerName = "No manager";
    if (department.Manager) {
      const manager = await employee_repo.getById(department.Manager);
      if (manager) {
        managerName = `${manager.First_Name} ${manager.Last_Name}`;
      }
    }

    return {
      id: department._id,
      name: department.Name,
      managerId: department.Manager,
      managerName
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//  Add a new department
 const addDepartment =  async(data)=>{
        try{
            return await department_repo.addDepartment(data);
    }catch(error){
        console.log(error);
        throw error
    }
 }

//  Update a department's details
const updateDepartment = async(id, newData)=> {
        try{
            return await department_repo.updateDepartment(id, newData);
    }catch(error){
        console.log(error);
        throw error
    }
}

// Delete a department and all its related employees and shifts
const deleteDepartment = async (id) => {
  try {

    const employeesInDepartment = await employee_repo.getByDepartmentId(id);

 
    for (const emp of employeesInDepartment) {
      await employee_shift_repo.deleteByEmployeeId(emp._id);
      await employee_repo.deleteEmployee(emp._id);
    }


    return await department_repo.deleteDepartment(id);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//  Assign an employee to a department
const assignEmployeeToDepartment = async(departmentId, employeeId) => {
  try {
    const department = await department_repo.getById(departmentId);
    if (!department) throw new Error("Department not found");

    return await employee_repo.updateEmployee(employeeId, { DepartmentID: departmentId });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//  Assign a manager to a department
const assignManager = async (departmentId, managerId) => {
  return await department_repo.updateManager(departmentId, managerId);
};




//  Get all employees who are not in a specific department
const getEmployeesNotInDepartment = async (departmentId) => {
  return await employee_repo.getEmployeesNotInDepartment(departmentId);
};


// Exports
module.exports = {
    getAll,
    getDepartmentById,
    addDepartment,
    updateDepartment,
    deleteDepartment,
    assignEmployeeToDepartment ,
    getEmployeesNotInDepartment,
    assignManager
    
}