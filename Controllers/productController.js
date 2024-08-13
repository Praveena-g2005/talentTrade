const Product = require('../Models/productmodel')
const {v4:uuidv4} = require('uuid');
exports.getProducts=async (req,res)=>{
    try{
        const products = await Product.find()
        res.send(products)
    }
    catch(e){
        console.error(e);
    }
}
exports.postProducts=async(req,res)=>{
    try{
        const {title,description,price,category,rating,image} = req.body;
        const product=new Product({
            id:uuidv4(),
            title,
            description,
            price,
            category,
            rating,
            image
        })
        await product.save();
        res.status(200).json("Product created successfully");
    }
    catch(e){
        console.log(e)
    }
}