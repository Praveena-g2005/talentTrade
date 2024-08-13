const User=require('../Models/userModel')
const Order=require('../Models/orderModel')
const Cart=require('../Models/cartmodel')
exports.placeorder=async (req,res)=>{
    const { user_id }=req.user;
    const {UserName,phoneNumber,Address}=req.body;
    try{
        const cart=await Cart.findOne({user_id});
        if(!cart || cart.products.length==0){
            res.status(200).json({message:"Cart not found"})
        }
        else{
            const {Email}=await User.findOne({_id:user_id})
            const items=cart.products;
            const orderDate=new Date();
            const estimatedDeliveryDate=new Date(orderDate.getTime()+10*24*60*60*1000)
            
            const order=new Order({
                UserName,
                Email,
                user_id,
                Address,
                phoneNumber,
                orderDate,
                estimatedDeliveryDate,
                items,
            })
            await order.save();
            await Cart.deleteOne({user_id});
            res.status(200).json({message:"Cart deleted siccessfully"})
        }
    }
    catch(err){
        res.status(500).json({message:"Error is occured"})
    }
}
exports.getorder=async (req,res)=>{
    const {user_id}=req.user;
    const order=await Order.find({user_id});
    try{
        if(!order){
            res.status(200).json({Message:"order is empty"})
        }
        res.status(200).json({items:order});
    }
    catch(err){
        res.status(400).json({Message:"Error occured"})
    }
}