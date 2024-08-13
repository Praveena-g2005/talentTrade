const order=require("../Controllers/orderController")
const express=require('express');
const Auth=require('../middlewares/auth')
const router=express.Router();

router.post("/placeorder",Auth,order.placeorder);
router.get("/getorder",Auth,order.getorder);
module.exports =router