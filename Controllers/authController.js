// Import Dependencies
const axios = require("axios");
const userService = require('../services/UserService');
const tokenService = require('../utils/tokenService');

// Login function to authenticate user using external API and internal DB
const login = async (username, email) => {
  try {
     // Step 1: Fetch users from external API (simulating external system validation)
    const { data } = await axios.get("https://jsonplaceholder.typicode.com/users");
    // Step 2: Check if user exists in the external API
    const externalUser = data.find(user => user.username === username && user.email === email);

     if (!externalUser) {
       // If user not found in external system
      return { success: false, message: "User not found in external system" };
    }

    // Step 3: Validate user in the internal database
    const result = await userService.loginUser(username, email);
    // If internal validation fails
    if (!result.success) {
      return { success: false, message: result.message };
    }

     // Step 4: Generate JWT token for the user
     const token = tokenService.sign(result.user);

     // Step 5: Return success with token and user info
    return { success: true, token, user: result.user };


  } catch (error) {

    // Catch and log any errors during the login process
    console.log("Login Error:", error);
    throw new Error("Login failed: " + error.message);
  }
};


//  Exports
module.exports = {
  login,
  
};
