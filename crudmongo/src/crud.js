const express = require('express');
const app = express();
const body = require("body-parser");
const path = require("path");

const multer = require("multer");
const fs = require("fs");

let imgfilename = '';
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null,'./uploads/')
    },
    filename: function (req, file, cb) {
        imgfilename = Date.now()+file.originalname
      return cb(null,imgfilename);
    }
  })
  
  const upload = multer({ storage: storage })
// const upload = multer({ dest:"./uploads/"})

const mainpath = path.join(__dirname, "../public");
app.use(express.static(mainpath));
app.use(express.static('uploads'));

const imageMainPath = path.join(__dirname,"uploads")
app.set("view engine", "ejs");
const bodyparse = body.urlencoded({ extended: false });
const mongo = require('mongodb');
const e = require('express');

const mongoclient = mongo.MongoClient;

const url = "mongodb://127.0.0.1:27017/";

const client = new mongoclient(url);

let udata = '';
async function getdata() {

    try {
        await client.connect();
        console.log("connect to db");
        const db = client.db('student')
        const collection = db.collection('user');
        let userdata = await collection.find({}).toArray();
        console.log(userdata);
        let udata = '';

        // insert new records
        app.get("/", (req, res) => {
            udata ='';
            res.render("form", {
                data: userdata,
                udata: udata
            });
        });
        
        app.post('/savedata', upload.single("image"), async (req, res) => {
            id = req.body.id;
            console.log(imgfilename)
            if (id != '') {
                
                udata = '';
                udata = userdata.find((i) => {
                    return i.id == id;
                })
                oldImageName = (udata.image!='')?udata.image:'';
                
                if(imgfilename != ''){
                    let imgname = "uploads/"+udata.image
                    fs.unlink(imgname,()=>{
                        console.log("Image deleted...")
                    })
                }
                let final = await collection.updateOne({
                    id: id,
                }, {
                    $set: {
                        name: req.body.name,
                        age: req.body.age,
                        email: req.body.email,
                        address: req.body.address,
                        image: (imgfilename != '')?imgfilename:oldImageName
                    }
                })
            } else {
                var data = {
                    id:(userdata.length + 1).toString(),
                    name: req.body.name,
                    age: req.body.age,
                    email: req.body.email,
                    address: req.body.address,
                    image: imgfilename
                }
                userdata.push(data);

                let result = await collection.insertOne(data);
                console.log(result);
                    
            }
            userdata = await collection.find({}).toArray();
            udata = '';
            res.render("form", {
                data: userdata,
                udata: udata
            });
            // res.redirect('/');
        });

        app.get('/del/:id', async (req, res) => {
            let id = req.params.id;
            let udata = userdata.find((i)=>{
                return i.id == id;
            }) 
            let imgname = "uploads/"+udata.image
            fs.unlink(imgname,()=>{
                console.log("Image deleted...")
            })

            del = await collection.deleteOne({ id: id });
            let userdata1 = await collection.find({}).toArray();
            udata = ''
            res.render("form", {
                data: userdata1,
                udata: udata
            });

        });
        app.get('/edit/:id', async (req, res) => {
            
            userdata = await collection.find({}).toArray();
            let id = req.params.id;
            udata = userdata.find((i) => {
                return i.id == id;
            });
            console.log(udata);
            res.render("form", {
                udata: udata,
                data: userdata

            });

        });
    } catch (err) {
        console.log(err);
    }
}
getdata();
// app.get('/', (req, res) => {
//     console.log("Hello mongodb....");
// });

app.listen(8005, "127.0.0.1", () => {
    console.log("listen on 8005...");
})