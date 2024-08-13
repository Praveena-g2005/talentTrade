const mongoose = require('mongoose') 
const cartschema=new mongoose.Schema({
    user_id:String,
    products:[
        {
            product_id:String,
            quantity:Number,
        }
    ],subTotal:Number
})
const cart= mongoose.model("cart",cartschema)
module.exports=cart