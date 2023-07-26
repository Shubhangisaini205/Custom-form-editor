const express = require("express");
const cors = require('cors');
const app = express()
app.use(cors());

const PORT = process.env.PORT || 8080;
app.get("/",(req,res)=>{
    res.send("Welcome to custom form builder")
})

app.listen(PORT,()=>{
    console.log("app is running at the port 8080")
})