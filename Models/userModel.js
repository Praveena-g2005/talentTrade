const mongoose= require("mongoose")
const bcrypt=require("bcrypt")
const userSchema= new mongoose.Schema({
    id:String,
    Username:{
        type:String,
        required:[true,"Name is Required"]
    },
    Email:{
        type:String,
        required:[true,"Email is Required"]
    },
    Password:{
        type:String,
        required:[true,"Password is Required"]
    }
})
userSchema.pre("save",async function(next){
    if(!this.isModified("Password")){
        return next()
    }
    const salt=await bcrypt.genSalt(10);
    this.Password= await bcrypt.hash(this.Password,salt);
    next()
})
const User=mongoose.model("User",userSchema)
module.exports=User;