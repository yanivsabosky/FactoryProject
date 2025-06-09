const express = require("express");
const tokenSrvice = require("../utils/tokenService");

const authenticateToken = (req, res, next) => {
   try {
       const authHeader = req.headers['authorization'];
       const token = authHeader && authHeader.split(' ')[1];

       if (!token) {
           return res.status(401).json({ message: "Access token required" });
       }

       const result = tokenSrvice.verify(token);
       if (result.success) {
           req.user = result.data;  
           next();
       } else {
           return res.status(403).json({ message: result.message });
       }

   } catch (error) {
       console.log(error);
       return res.status(500).json({ error: "Internal server error" });
   }   
}

module.exports = {
    authenticateToken
}

