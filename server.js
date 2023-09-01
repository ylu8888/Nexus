const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()
const productRoute = require('./routes/productRoute')
const errorMiddleware = require('./middleware/errorMiddleware')
var cors = require('cors')

//need middleware to use the productRoute


const MONGODB_URL = process.env.MONGODB_URL

var corsOptions = {
    origin: 'http://example.com',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

app.use(cors(corsOptions))
//need to specify json middleware so app can understand json
app.use(express.json())
//if you want to use form instead of json, set middleware to form
app.use(express.urlencoded({extended: false}))

//routes for running web page
app.use('/api/products', productRoute)

app.get('/', (req,res) => {
    //throw new Error('fake error')
    res.send('Hello Node Api!')
})

app.get('/blog', (req,res) => {
    res.send('Hello Blog! My name is Yang')
})


app.use(errorMiddleware);


mongoose.set("strictQuery", false)
mongoose.connect(MONGODB_URL)
.then(() => {
    console.log('Connected to MongoDB!')
    app.listen(3000, () => {
        console.log(`Node API is running!`)
    })
}).catch((error) => {
    console.log(error)
})