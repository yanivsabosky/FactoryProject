const express = require("express");
const tokenSrvice = require("../utils/tokenService");

// Middleware to authenticate a request using a JWT token
// It checks if a valid token is present and decodes it to retrieve user data
const authenticateToken = (req, res, next) => {
   try {
      // Extract the token from the Authorization header (format: "Bearer <token>")
       const authHeader = req.headers['authorization'];
       const token = authHeader && authHeader.split(' ')[1];

       // If no token is provided, respond with Unauthorized status   
       if (!token) {
           return res.status(401).json({ message: "Access token required" });
       }

        // Verify the token using the token service
       const result = tokenSrvice.verify(token);

       if (result.success) {
        // If valid, attach the decoded user data to the request object
           req.user = result.data;  
           next();
       } else {
        // If verification failed, respond with Forbidden status
           return res.status(403).json({ message: result.message });
       }

   } catch (error) {
       console.log(error);
        // Handle any unexpected server error
       return res.status(500).json({ error: "Internal server error" });
   }   
}

// Exports
module.exports = {
    authenticateToken
}

