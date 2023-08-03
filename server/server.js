require('dotenv').config()
const express = require("express")
const mongoose = require('mongoose')
const path = require("path")
const app = express();
const PORT = process.env.PORT || 3500;

app.use('/', express.static(path.join(__dirname, "public")))

//routes
app.use('/',  require("./routes/root"))
//app.use('/register', require('./routes/register'))
//app.use('/login', require('./routes/login'))
//app.use('/users', require('./routes/users'))


app.listen(PORT, () => {console.log("Server connected to port: ", PORT)})