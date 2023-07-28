//binary code / byte code 
// const a = new Buffer.alloc(5,"D");

// console.log(a);
const a = require('http');

const server = a.createServer( (req,res)=>{
    res.writeHead(200,{'Content-Type':'text/plain'});
    res.write("HEllo......");
    res.end("Connection established - 8000");
});

server.listen(8000,"127.0.0.1",()=>{
    console.log("Listening port");
})



