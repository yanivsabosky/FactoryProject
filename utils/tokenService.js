require("dotenv").config();
const jwt = require("jsonwebtoken");

const sign = (user) => {
    try{
             const userOBJ = {
                id: user._id,
                username: user.username,
                email: user.email,
                fullName: user.fullName,
                role: user.role
            };
    
            const access_Token = jwt.sign(userOBJ, process.env.JWT_SECRET_TOKEN, {
                expiresIn: '24h' 
            });
         return access_Token;
    }catch(error){
        console.log(error)
        throw error
    }
   
}
const verify = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
        return { success: true, data: decoded };
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return { success: false, message: 'Token expired' };
        } else if (error.name === 'JsonWebTokenError') {
            return { success: false, message: 'Invalid token' };
        } else {
            return { success: false, message: 'Token verification failed' };
        }
    }
}

module.exports ={
    sign,
    verify
}