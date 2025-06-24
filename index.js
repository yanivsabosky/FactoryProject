// Load environment variables from .env file
require("dotenv").config();

// Import core modules and routes 
const express = require("express");
const connectDB = require("../Server/configs/data");
const employee_route = require("../Server/Routes/employeeRoutes");
const department_route = require("../Server/Routes/departmentRoutes");
const shift_route = require("../Server/Routes/shiftRoutes");
const user_route = require("../Server/Routes/userRoutes");
const auth_route = require("../Server/Routes/authRoutes");
const cors = require("cors"); 



// Initialize Express application
const app = express();
const port = 3000;





// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json())


// Route definitions
app.use("/employees", employee_route);
app.use("/departments", department_route);
app.use("/shifts", shift_route);
app.use("/users", user_route);
app.use("/", auth_route);



// Start the server and connect to the database
app.listen(port,()=>{
    console.log(`im Runnig At Port ${port}`)
    connectDB();
})