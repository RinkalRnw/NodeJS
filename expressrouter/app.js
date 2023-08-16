const express = require('express') 
const app = express()

const productRoutes = require('./routes/products')
app.use('/users',productRoutes);

app.listen(8081,"127.0.0.1",(req,res)=>{
    console.log("Port 8081 listening on")
})

