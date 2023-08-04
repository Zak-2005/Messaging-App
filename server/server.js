require('dotenv').config()
const express = require("express")
const mongoose = require('mongoose')
const connectDB = require('./config/dbConn')
const cookieParser = require('cookie-parser');
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const path = require("path")
const app = express()
const PORT = process.env.PORT || 3500;

connectDB();

app.use(cors({
    origin: 'http://localhost:5173', // Replace this with your frontend domain
    credentials: true,
  }));
app.use(cookieParser())
app.use('/', express.static(path.join(__dirname, "public")))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
//routes
app.use('/',  require("./routes/root"))
app.use('/register', require('./routes/register'))
app.use('/login', require('./routes/login'))
app.use('/refresh', require('./routes/refresh'))
app.use('/user', require('./routes/api/users'))
app.use('/chat', require('./routes/chat'))
app.use('/message', require('./routes/message'))
app.listen(PORT, () => {console.log("Server connected to port: ", PORT)})