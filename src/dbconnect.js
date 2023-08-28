const express = require('express');
const mongo = require('mongodb');

const mongoclient = mongo.MongoClient;
const url = "mongodb://127.0.0.1:27017/";

const client = new mongoclient(url) 
async function myData(){
    try{
        await client.connect();
        console.log("Connected to Db")
        const db = client.db("student");
        const collection = db.collection('user');
        // const user = await collection.find().toArray()
        // console.log(user)

        //Insert a new record
        // const result = await collection.insertOne({
        //     name:"test",
        //     age:"20"
        // },(err,res)=>{
        //     if(err) throw err
        //     console.log("Inserted")
        // })
        // console.log(result)

        /*const result = await collection.insertMany(
            [
                {
                    name:"test1",
                    age:"26"
                },
                {
                    name:"test2",
                    age:"24"
                },
                {
                    name:"test3",
                    age:"20"
                },
                {
                    name:"test4",
                    age:"20"
                }
            ],(err,res)=>{
            if(err) throw err
            console.log("Inserted")
        })
        console.log(result)
*/
        //Search data whose age is 20
        // const filterData = await collection.find({age:"20"}).toArray()
        // console.log(filterData)

        // const delData = await collection.deleteOne({name:"test1"},(err,res)=>{
        //     if(err) throw err
        //     console.log("Deleted")
        // })
        // console.log(delData)

        const updateData = await collection.updateOne({name:"test"},{$set:{name:"T1"}},(err,res)=>{
                if(err) throw err
                console.log("Updated")
            })
            console.log(updateData)    

    } catch(e){
        console.error(e)
    }
}

myData()
const app = express();

app.get('/', (req, res) => {
    console.log("Hello...")
})

app.listen(8080,"127.0.0.1",()=>{
    console.log("Listen on 8080")
});