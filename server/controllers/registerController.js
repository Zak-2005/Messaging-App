const User = require('../models/User')
const bcrypt = require('bcrypt')
const registerNewUser = async(req,res)=> {
    console.log(req.body)
    const {user, pass} = req.body;
    if(!user || !pass){
        res.status(400).json({msg: "Username and password required"})
    }
    const duplicate = await User.findOne({username: user}).exec()
    if(duplicate) return res.sendStatus(409)
    try{
        const hashedPwd = await bcrypt.hash(pass, 10);
        const createUser = await User.create({
            "username": user,
            "password": hashedPwd
        });
        res.json({"success": true})
    }catch(err){
        res.status(500).json({msg: err.message})
    }
}

module.exports = {registerNewUser}