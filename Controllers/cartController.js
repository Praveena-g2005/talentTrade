const auth=require("../middlewares/auth")
const Cart=require("../Models/cartmodel")
const Product=require("../Models/productmodel")
exports.createcart =async (req,res)=>{
    const {user_id} = req.user;
    const {product_id,quantity}=req.body;
    let cart= await Cart.findOne({user_id});
    if(!cart){
         cart=new Cart({
            user_id,
            products:[{product_id,quantity}]
        });
    }
    else{
        const productindex=cart.products.findIndex((el)=>el.product_id===product_id)
        if(productindex>-1){
            cart.products[productindex].quantity=quantity;
        }
        else{
            cart.products.push({product_id,quantity});
        }
    }
    cart.save()
    return res.status(200).json(cart)   
}
exports.getcart=async (req,res)=>{
    const {user_id} = req.user;
    const  cart = await Cart.findOne({user_id})
    if(!cart){
        return res.status(404).json({message:"Cart is not found"})
    }
    try{
        let subTotal=0;
        const CartItems=await Promise.all(
            cart.products.map(async (product)=>{
                const productDetails= await Product.findOne({id:product.product_id});
                subTotal+=productDetails.price*product.quantity;
                return{
                    product_id:productDetails.id,
                    title:productDetails.title,
                    description:productDetails.description,
                    price:productDetails.price,
                    image:productDetails.image,
                    quantity:product.quantity,
                };
            })
            
        );
        return res.status(200).json({cartitems:CartItems,subTotal})
    }
    catch(err){
        res.status(500).json({message:"serverError",err});
    }
}
exports.deleteCart=async (req,res)=>{
    const {user_id}=req.user;
    const cart=await Cart.findOne({user_id})
     try{   
        cart.products=cart.products.filter((el)=> el.product_id!==req.params.product_id)
        if(cart.products.length===0){
            await Cart.deleteOne({user_id})
            res.status(200).json({message:"Cart deleted"})
        }
        else{
            cart.save()
        }
        res.status(200).json({cart})
    }
    catch(err){
        res.status(400).json({message:err})
    }
}