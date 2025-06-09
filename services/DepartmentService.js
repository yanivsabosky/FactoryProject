const department_repo = require("../repository/DepartmentRepo");
const employee_repo = require("../repository/EmployeeRepo");
const shift_repo = require("../repository/ShiftRepo");


// functions 
const getAll = async()=>{
    try{
        return await department_repo.getAll();
    }catch(error){
        console.log(error);
        throw error
    }  
}
const getDepartmentById = async (id) => { 
        try{
         return await department_repo.getById(id);
    }catch(error){
        console.log(error);
        throw error
    }
 }

 const addDepartment =  async(data)=>{
        try{
            return await department_repo.addDepartment(data);
    }catch(error){
        console.log(error);
        throw error
    }
 }
const updateDepartment = async(id, newData)=> {
        try{
            return await department_repo.updateDepartment(id, newData);
    }catch(error){
        console.log(error);
        throw error
    }
}

const deleteDepartment = async(id)=>{
        try{
             return await department_repo.deleteDepartment(id);
    }catch(error){
        console.log(error);
        throw error
    }



}


module.exports = {
    getAll,
    getDepartmentById,
    addDepartment,
    updateDepartment,
    deleteDepartment,
    
}