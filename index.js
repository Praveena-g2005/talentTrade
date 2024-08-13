const express=require('express')
const app=express()
const productsRoute=require('./routes/productRoute')
const userRoute=require('./routes/userRoute')
const cartRoute=require('./routes/cartRoute')
const orderRoute=require('./routes/orderRoute')
const mongoose=require('mongoose')
app.use(express.json())
mongoose.connect(
    'mongodb://localhost:27017/TalentTrade').then(()=>{
        console.log("Connected to database");
    });

app.use("/products",productsRoute);
app.use("/user",userRoute)
app.use("/cart",cartRoute);
app.use("/order",orderRoute);
app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})

