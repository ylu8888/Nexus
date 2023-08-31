const express = require('express')
const app = express()

//routes for running web page

app.get('/', (req,res) => {
    res.send('Hello Node Api!')
})

app.listen(3000, () => {
    console.log(`Node API is running!`)
})