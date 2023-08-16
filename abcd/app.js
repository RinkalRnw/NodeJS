const express = require('express');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname))
const adminRoutes = require('./routes/admin');
app.use('/admin', adminRoutes);

app.get('/', (req, res) => {
    res.send("User side")
})

app.listen(8004,"127.0.0.1",()=>{
    console.log("Listening on port 8004");
})