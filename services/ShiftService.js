// Import required repositories
const shift_repo = require("../repository/ShiftRepo");
const employee_repo = require("../repository/EmployeeRepo");


// Shift Service Methods

// Get all shifts from the database
const getAllShifts = async()=>{
    try{
        return await shift_repo.getAll();
    }catch(error){
        console.log(error)
        throw error

    }
}

// Get a specific shift by its ID
const getShiftById = async(id)=>{
        try{
            return await shift_repo.getByid(id);
        }catch(error){
        console.log(error)
        throw error

    }

}

//Add a new shift to the database 
const addShift = async(data)=>{
        try{
           return await shift_repo.add(data);
        }catch(error){
        console.log(error)
        throw error

    }

}

// Update an existing shift by its ID
const updateShift = async(id, data)=>{
    try{
        return shift_repo.updateShifts(id,data);

    }catch(error){
        console.log(error) 
        throw error
    }
}

// Assign an employee to a specific shift
const addEmployeeToShift = async(shiftId, employeeId)=>{
    try{

        // Ensure both shift and employee exist

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


// Exports
module.exports = {
    getAllShifts,
    getShiftById,
    addShift,
    updateShift,
    addEmployeeToShift


}