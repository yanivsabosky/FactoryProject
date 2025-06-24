// Import the user service which contains business logic
const userService = require("../services/UserService");

// Controller function to get all users from the service layer
const getAllUsers = async () => {
  try {
      // Call the service function to retrieve all users
    const data = await userService.getAllUsers();
    return data;
  } catch (error) {
     // Re-throw the error to be handled by the route/controller level
    throw error;
  }
};

// Exports
module.exports = {
  getAllUsers
};
