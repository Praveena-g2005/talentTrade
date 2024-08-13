const mongoose=require("mongoose")
const orderSchema=new mongoose.Schema({
    user_id:String,
    UserName:String,
    Email:String,
    Address:{
        type:String,
        require:[true,"Address is required"]
    },
    phoneNumber:{
        type:Number,
        require:[true,"Phone is required"]
    },
    items:[{
        product_id:String,
        quantity:Number
    }],
    orderDate:{
        type:Date,
        default:Date.now,
        require:[true,"Date is required"]
    },
    estimatedDeliveryDate:{
        type:Date,
        require:[true,"Date is required"]
    },
    subTotal:Number
});

const orderModel=mongoose.model("order",orderSchema);
module.exports=orderModel;
