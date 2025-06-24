// Load environment variables from .env file
require("dotenv").config();

// Import the jsonwebtoken library for token handling
const jwt = require("jsonwebtoken");

// Generate a signed JWT token based on user data.
const sign = (user) => {
    try{
        // Create a payload with selected user fields
             const userOBJ = {
                id: user._id,
                username: user.username,
                email: user.email,
                fullName: user.fullName,
                role: user.role
            };
    
            // Sign the JWT with secret and expiration time
            const access_Token = jwt.sign(userOBJ, process.env.JWT_SECRET_TOKEN, {
                expiresIn: '24h' 
            });
         return access_Token;
    }catch(error){
        console.log(error)
        throw error
    }
   
}

// Verify a given JWT token.
const verify = (token) => {
    try {
         // Verify the token using the secret
        const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
        return { success: true, data: decoded };
    } catch (error) {
        // Handle specific token errors
        if (error.name === 'TokenExpiredError') {
            return { success: false, message: 'Token expired' };
        } else if (error.name === 'JsonWebTokenError') {
            return { success: false, message: 'Invalid token' };
        } else {
            return { success: false, message: 'Token verification failed' };
        }
    }
}

// Exports
module.exports ={
    sign,
    verify
}