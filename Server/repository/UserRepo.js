const users = require("../models/User");

// functions

const getAll = async()=>{
  return await users.find()
}

const getByUsernameAndEmail = async (Uname, Upassword) => {
  return await users.findOne({ username: Uname, password: Upassword });
};


const updateActions = async(id,newValue)=>{
  return await users.findByIdAndUpdate(id, { Num_Of_Actions: newValue }, { new: true })
}

const addUser = async(Nuser)=>{
  return await  users.create(Nuser)
}

module.exports = {
  getAll,
  getByUsernameAndEmail,
  updateActions,
  addUser

}

