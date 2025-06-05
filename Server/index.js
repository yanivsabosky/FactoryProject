const express = require("express");
const router = require("../Server/Routes/Route")
const cors = require("cors"); 


const app = express();
const port = 3000;


app.use(cors());
app.use(express.json())

app.use("/",router)



app.listen(port,()=>{
    console.log(`im Runnig At Port ${port}`)
})