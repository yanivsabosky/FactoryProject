const express =require("express");
const userService = require('../services/UserService');
const tokenService = require('../utils/tokenService');

const login = async (req, res) => {
    try{
            const {username,email} = req.body;
            const result = await userService.loginUser(username,email);
            if(result.success){
                const token = tokenService.sign(result.user);
                return res.json({ token, user: result.user });
            }
            else  return res.status(403).json({message: result.message});
            
    }catch(error){
        res.sendStatus(401).json({message:error})
    }


}

module.exports = {
    login

}