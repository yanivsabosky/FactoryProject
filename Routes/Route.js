const axios = require("axios");
const express = require("express");
// const bodyparser = require("body-parser")

const router = express.Router();
router.use(express.json())

// ROUTES

// Login Route

// GET
router.get("/",(req,res)=>{
    res.send("hello")
})

router.post("/",async(req,res)=>{
   const response = await axios.get("https://jsonplaceholder.typicode.com/users");
   const data = response.data;
    const {email} = req.body ; 
   
    const user = data.find((u) => u.email === email); 

    if(user){
        res.json(req.body)
    }     
    return res.status(401).send("Not authorized");

})

module.exports = router;
