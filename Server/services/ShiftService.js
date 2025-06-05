const shift_repo = require("../repository/ShiftRepo");
const employee_repo = require("../repository/EmployeeRepo");
const getAllShifts = async()=>{
    try{
        return await shift_repo.getAll();
    }catch(error){
        console.log(error)
        throw error

    }
}
const getShiftById = async(id)=>{
        try{
            return await shift_repo.getByid(id);
        }catch(error){
        console.log(error)
        throw error

    }

}

const addShift = async(data)=>{
        try{
           return await shift_repo.add(data);
        }catch(error){
        console.log(error)
        throw error

    }

}
const updateShift = async(id, data)=>{
    try{
        return shift_repo.updateShifts(id,data);

    }catch(error){
        console.log(error) 
        throw error
    }
}

const addEmployeeToShift = async(shiftId, employeeId)=>{
    try{
        const shift = await shift_repo.getByid(shiftId);
        const employee = await employee_repo.getById(employeeId);
       if(shift && employee){
             return await shift_repo.addEmployeeToShift(shiftId,employeeId)   
       }
       else{
              throw new Error("Shift or Employee not found");
        }

    }catch(error){
        console.log(error);
        throw error;
    }
}


module.exports = {
    getAllShifts,
    getShiftById,
    addShift,
    updateShift,
    addEmployeeToShift


}