const users = require("../models/User");

// functions

const getAll = async()=>{
  return await users.find()
}

const getByUsernameAndEmail = async (Uname, Uemail) => {
  return await users.findOne({ username: Uname, email: Uemail });
};

const getUserById =async(userId)=>{
  return await users.findById(userId)
}




// const updateActions = async(id,newValue)=>{
//   return await users.findByIdAndUpdate(id, newValue , { new: true })
// }

const addUser = async(Nuser)=>{
  return await  users.create(Nuser)
}

const updateDailyStats = async (id) => {
  const user = await users.findById(id);
  if (!user) {
    throw new Error("User not found");
  }

  const now = new Date();
  const last = user.lastActionAt || new Date(0); 

  const isNewDay = now.toDateString() !== last.toDateString();
  if (isNewDay) {
    user.actionsToday = 0;
  }

  if (user.role !== 'Admin') {
    if (user.actionsToday >= user.numOfActions) {
      throw new Error("You used all your actions today!");
    }
    user.actionsToday += 1;
  }


  user.lastActionAt = now;

  await user.save();
  return user;
};


module.exports = {
  getAll,
  getUserById,
  getByUsernameAndEmail,
  
  addUser,
  updateDailyStats

}

