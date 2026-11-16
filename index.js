const express = require("express");
const cors = require("cors");
const cookieParser=require("cookie-parser")
require('dotenv').config()
const routes=require('./routes/allRoutes')
require("./config/db");

const server = express();
server.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
}));
server.use(express.json());
server.use(cookieParser())

server.use(routes)

server.get('/',(req,res)=>{
    res.status(200).send('<p>Server started</p>')
})

server.post('/',(req,res)=>{
    res.status(200).send("Post Request")
})

server.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500).json({
        success: false,
        message: err.message
    })
})

const PORT=process.env.PORT

server.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})