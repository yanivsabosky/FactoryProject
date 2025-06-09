const user_repo  = require("../repository/UserRepo");
const axios = require("axios");

// functions 
const getAllUsers = async()=>{
    return await user_repo.getAll();
}
const getUser = async (username, email) =>{
        return await user_repo.getByUsernameAndEmail(username,email);
}

const loginUser = async (username, email) => {
  try {
    const { data } = await axios.get(`https://jsonplaceholder.typicode.com/users?username=${username}`);
    
    const extUser = data.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!extUser) {
      return { success: false, message: "User not found in external API" };
    }
    const existingUser = await user_repo.getByUsernameAndEmail(username, email);
    if (existingUser) {
      return {
        success: true,
        message: "User already exists",
        user: existingUser
      };
    }
    const newUser = {
      username,
      email,
      fullName: extUser.name,
      numOfActions: 10,
      role: "User",
      actionsToday: 0,
      lastActionAt: null
    };

    const createdUser = await user_repo.addUser(newUser);

    return {
      success: true,
      message: "New user created",
      user: createdUser
    };

  } catch (error) {
    console.error("Error in loginUser:", error);
    throw error;
  }
};

   const checkAndUpdateDailyActions = async (userId) => {
  try {
    await user_repo.updateDailyStats(userId);
    return { status: 'OK' };                 
  } catch (err) {
    if (err.message.includes('all your actions')) {
      return { status: 'LIMIT_REACHED' };    
    }
    throw err;                              
  }
};

    




module.exports = {
    getAllUsers,
    getUser,
    loginUser,
    checkAndUpdateDailyActions
    
}