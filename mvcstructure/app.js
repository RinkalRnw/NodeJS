const express = require('express')
const app = express()

const routes = require("./routes/user")

app.use(routes)

app.get('/', (req, res) => {
    console.log("default calling..")
    res.end()
})

app.listen(8001, () => {
    console.log("listening on port 8080")
})