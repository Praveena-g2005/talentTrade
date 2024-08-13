const Productcontroller = require('../Controllers/productController')
const express=require('express');
const Auth=require('../middlewares/auth')
const router=express.Router();

router.get("/",Auth,Productcontroller.getProducts)
router.post("/",Auth,Productcontroller.postProducts)
module.exports =router