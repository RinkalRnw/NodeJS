const express = require('express');
const app = express();
const path = require('path');
const mongo = require('mongodb');
const body = require('body-parser');
const bodyparser = body.urlencoded({extended: false});

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname)))

const mongoclient = mongo.MongoClient;
const url = "mongodb://127.0.0.1:27017/";

const client = new mongoclient(url) 
let db;
let collection;

app.post('/savedata', bodyparser,(req, res) => {
    data = req.body;
    async function mainConnection(){
        await client.connect();
        console.log("Connected to Db")
        db = client.db("student");
        collection = db.collection('user');

        const result = await collection.insertOne(data,(err,res)=>{
            if(err) throw err
            console.log("Inserted")
        })
        console.log(result)
    }
    mainConnection()
})

app.listen(8002,"127.0.0.1",()=>{
    console.log("listening on port 8002")
})