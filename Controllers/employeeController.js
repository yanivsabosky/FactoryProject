// Importing necessary services and repositories
const employeeService = require("../services/EmployeeService");
const departmentService = require("../services/DepartmentService");
const employee_shift = require("../repository/EmployeeShiftRepo");
const shiftService = require("../services/ShiftService");

// Get a full list of all employees with department name and list of their shifts
const getAllEmployees = async () => {
  try {
    const data = await employeeService.getAllEmployees();
    const full_data = [];

    for (const employee of data) {
      const department = await departmentService.getDepartmentById(employee.DepartmentID);
      const employeeShifts = await employee_shift.getByEmployeeId(employee._id);

      const shifts = [];
      for (const link of employeeShifts) {
        const shift = await shiftService.getShiftById(link.shiftId);
        if (shift) {
          shifts.push({
            date: shift.Date,
            start: shift.Starting_Hour,
            end: shift.Ending_Hour
          });
        }
      }

      full_data.push({
        id: employee._id,
        fullName: `${employee.First_Name} ${employee.Last_Name}`,
        department: department ? department.Name : "No department",
        shifts
      });
    }

    return full_data;
  } catch (error) {
    throw error;
  }
};

// Get detailed information of a single employee by ID
const getEmployeeById = async (id) => {
  try {
    const employee = await employeeService.getEmployeeById(id);
    if (!employee) throw new Error("Employee not found");

    const department = await departmentService.getDepartmentById(employee.DepartmentID);
    const employeeShifts = await employee_shift.getByEmployeeId(employee._id);

    const shifts = [];
    for (const link of employeeShifts) {
      const shift = await shiftService.getShiftById(link.shiftId);
      if (shift) {
        shifts.push({
          date: shift.Date,
          start: shift.Starting_Hour,
          end: shift.Ending_Hour
        });
      }
    }

    return {
      id: employee._id,
      First_Name: employee.First_Name,
      Last_Name: employee.Last_Name,
      Start_Work_Year: employee.Start_Work_Year,
      departmentId: employee.DepartmentID,
      departmentName: department ? department.Name : "No department",
      shifts
    };
  } catch (error) {
    throw error;
  }
};

// Create a new employee
const createEmployee = async (body) => {
  try {
    return await employeeService.addEmployee(body);
  } catch (error) {
    throw error;
  }
};

// Update an existing employee
const updateEmployee = async (id, body) => {
  try {
    return await employeeService.updateEmployee(id, body);
  } catch (error) {
    throw error;
  }
};

//  Delete an employee by ID
const deleteEmployee = async (id) => {
  try {
    return await employeeService.deleteEmployee(id);
  } catch (error) {
    throw error;
  }
};

// Assign a department to an employee
const assignDepartment = async (employeeId, departmentId) => {
  try {
    return await employeeService.assignDepartment(employeeId, departmentId);
  } catch (error) {
    throw error;
  }
};

// Assign a shift to an employee
const assignShift = async (employeeId, shiftId) => {
  try {
    return await employeeService.assignShift(employeeId, shiftId);
  } catch (error) {
    throw error;
  }
};

// Get all employees that are not assigned to the specified department
const getEmployeesNotInDepartment = async (departmentId) => {
  try {
    return await employeeService.getEmployeesNotInDepartment(departmentId);
  } catch (error) {
    throw error;
  }
};

// Get all employees assigned to a specific department
const getEmployeesByDepartment = async (departmentId) => {
  try {
    return await employeeService.getEmployeesByDepartment(departmentId);
  } catch (error) {
    throw error;
  }
};

// Exports
module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  assignDepartment,
  assignShift,
  getEmployeesNotInDepartment,
  getEmployeesByDepartment
};
