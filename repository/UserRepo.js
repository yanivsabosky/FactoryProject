const users = require("../models/User");

// Repository functions for interacting with the Users collection


// Get all users from the database
const getAll = async()=>{
  return await users.find()
}

// Get a specific user by username and email (used for login)
const getByUsernameAndEmail = async (Uname, Uemail) => {
  return await users.findOne({
    username: Uname,
    email: Uemail
    
  });
};

//  Get a user by their unique ID
const getUserById =async(userId)=>{
  return await users.findById(userId)
}

//  Add a new user to the collection
const addUser = async(Nuser)=>{
  return await  users.create(Nuser)
}

// Update the user's daily action count
// Resets count if it's a new day, blocks if limit exceeded (unless Admin) 
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

// Exporting
module.exports = {
  getAll,
  getUserById,
  getByUsernameAndEmail,  
  addUser,
  updateDailyStats

}

