const User=require('../Models/userModel')
const bcrypt=require('bcrypt')
const jwt=require("jsonwebtoken")
exports.login= async (req,res)=>{
    const {Email,Password}=req.body;
    try{
        const user = await User.findOne({Email})
        if(!user){
            res.status(400).json("Invalid Email or Password")
        }
        const isMatch=await bcrypt.compare(Password,user.Password);
        if(!isMatch){
            return res.status(400).json("Invalid email or password")
        }
        const token = jwt.sign({user_id:user._id},"secret_token",{
            expiresIn:"1d",
        })
        return res.status(200).json(token);
    }
    catch(e){
        console.error(e);
    }

}
exports.getUser=async (req,res)=>{
    try{
        const user = await User.find()
        res.send(user)
    }
    catch(e){
        console.error(e);
    }
}
exports.addUser=async(req,res)=>{
    try{
        const {Username,Email,Password} = req.body;
        const user=new User({
            Username,Email,Password
        })
        await user.save();
        res.status(200).json("user created successfully");
    }
    catch(e){
        console.log(e)
    }
}