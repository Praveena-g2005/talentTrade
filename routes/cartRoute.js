const cart=require("../Controllers/cartController")
const express=require('express');
const Auth=require('../middlewares/auth')
const router=express.Router();

router.post("/createcart",Auth,cart.createcart);
router.get("/getcart",Auth,cart.getcart);
router.delete("/deletecart/:product_id",Auth,cart.deleteCart);
module.exports =router