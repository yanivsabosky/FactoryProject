const employee_repo =  require("../repository/EmployeeRepo");
const department_repo = require("../repository/DepartmentRepo");
const shift_repo = require("../repository/ShiftRepo");
const user_repo = require("../repository/UserRepo");
const employee_shift_repo = require("../repository/EmployeeShiftRepo");

const getAllEmployees = async()=>{
    try{
        return await employee_repo.getAll()

    }catch(error){
        console.log(error)
        throw error
    }

} 
const getEmployeeById = async(id)=>{
        try{
         
         return await employee_repo.getById(id)
        
    }catch(error){
        console.log(error)
        throw error
    }
} 
const addEmployee = async (data) => {
  try {
    const { First_Name, Last_Name, Start_Work_Year, DepartmentID, shifts, user } = data;

    // 1. בדיקה שהמחלקה קיימת
    const department = await department_repo.getById(DepartmentID);
    if (!department) throw new Error("Department not found");

    // 2. יצירת העובד
    const newEmployee = await employee_repo.addEmployee({
      First_Name,
      Last_Name,
      Start_Work_Year,
      DepartmentID
    });

    // 3. שיוך למשמרות
    if (shifts && shifts.length > 0) {
      for (const shiftId of shifts) {
        await shift_repo.addEmployeeToShift(shiftId, newEmployee._id);
      }
    }

    // 4. יצירת יוזר
    if (user) {
      await user_repo.addUser({
        ...user,
        employeeId: newEmployee._id
      });
    }

    // 5. החזרה
    return newEmployee;

  } catch (error) {
    console.log(error);
    throw error;
  }
};
 
const updateEmployee = async(id, data)=>{
        try{
            return await employee_repo.updateEmployee(id,data)
        
    }catch(error){
        console.log(error)
        throw error
    }
}
const deleteEmployee = async(id) =>{
        try{
            await employee_shift_repo.deleteByEmployeeId(id);
            return   await employee_repo.deleteEmployee(id)
        
    }catch(error){
        console.log(error)
        throw error
    }
} 

module.exports = {
    getAllEmployees ,
    getEmployeeById ,
    addEmployee ,
    updateEmployee , 
    deleteEmployee


}
