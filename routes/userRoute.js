const usercontroller=require('../Controllers/userController')
const express=require('express');
const router=express.Router();

router.get("/",usercontroller.getUser)
router.post("/createuser",usercontroller.addUser)
router.post("/login",usercontroller.login)
module.exports =router