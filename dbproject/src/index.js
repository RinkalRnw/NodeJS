const express = require('express');

const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;


const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});
const uri = "mongodb://127.0.0.1:27017/";
const client = new MongoClient(uri);


async function main() {

    try {
        await client.connect();
    
        console.log("Connect to db")
        const db = client.db("bookstore");
        const collection = db.collection("bookstore");
        const response = await collection.find({}).toArray();
        console.log(response);
     
    } catch (e) {
        console.error(e);
    }
    // we'll add code here soon
}

main();
app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});