// Importing required modules and helpers
const user_repo  = require("../repository/UserRepo");
const axios = require("axios");
const { equalsFlexible, normalize } = require("../utils/stringMethods");

// User Service Methods


//  Retrieve all users from the DB 
const getAllUsers = async () => {
  try {
    const users = await user_repo.getAll();
    const usersObj = users.map((user) => ({
      fullName: user.fullName,
      numOfActions: user.numOfActions,
      actionsToday: user.actionsToday
    }));

    return usersObj;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//  Retrieve a user by their username and email
const getUser = async (username, email) =>{
        return await user_repo.getByUsernameAndEmail(username,email);
}

//Login process:
// Checks if the user exists in external API, normalizes input,
// and adds the user to the system if not already registered.

const loginUser = async (username, email) => {
  try {

    const normUsername = normalize(username);
    const normEmail = normalize(email);

     // Fetch from external API based on username
    const { data } = await axios.get(`https://jsonplaceholder.typicode.com/users?username=${username}`);
    
    // Find matching email in external data
    const extUser = data.find(u => equalsFlexible(u.email.toLowerCase(), normEmail));
    if (!extUser) {
      return { success: false, message: "User not found in external API" };
    }

     // Check if user already exists in our DB
    const existingUser = await user_repo.getByUsernameAndEmail(normUsername, normEmail);
    if (existingUser) {
      return {
        success: true,
        message: "User already exists",
        user: existingUser
      };
    }
    // Creating New User
    const newUser = {
      username: normUsername,
      email: normEmail,
      fullName: extUser.name,
      numOfActions: 10,
      role: "User",
      actionsToday: 0,
      lastActionAt: null
    };


    // Create New User
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


//Check and update the user's daily action count
// If a new day has started, the counter resets.
// If the user reached the daily limit, return a proper message.
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

    



// Exports
module.exports = {
    getAllUsers,
    getUser,
    loginUser,
    checkAndUpdateDailyActions
    
}