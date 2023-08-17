const express = require('express')
const app = express()

const routes =  require("./routes/user")

app.set('view engine', 'ejs')
app.use(express.static(__dirname))
app.use(routes)

app.get('/', (req, res) => {
    res.end("User Panel")
})

app.listen(8001, () => {
    console.log("listening on port 8001")
})