const mongoose = require('mongoose');

const productSchema=new mongoose.Schema({
    id:String,
    title:String,
    description:String,
    category:String,
    image:String,
    price:Number,
    rating:{
        rate:Number,
        count:Number
    }
})

const Product=new mongoose.model('Product',productSchema)
module.exports= Product;
