const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Product = require('./models/productModel')
require('dotenv').config()

const MONGODB_URL = process.env.MONGODB_URL

//need to specify json middleware so app can understand json
app.use(express.json())
//if you want to use form instead of json, set middleware to form
app.use(express.urlencoded({extended: false}))

//routes for running web page

app.get('/', (req,res) => {
    res.send('Hello Node Api!')
})

app.get('/blog', (req,res) => {
    res.send('Hello Blog! My name is Yang')
})

//route for saving data into database
app.post('/products', async(req, res) => {
    try{
        //since we need to save data to database, we have to save it through product Model
        //when interacting with database, use await
        const product = await Product.create(req.body) //creating new product in the database
        res.status(200).json(product);
        
        
        } catch (error) {
        console.log(error.message); //show the errors
        res.status(500).json({message: error.message})
        }
         
})

//for fetching and getting data from database

//this will retrieve ALL products
app.get('/products', async(req, res) => {
    try {
        const products = await Product.find({}) 
        res.status(200).json(products) //put the product display in json
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//this will retrieve product by ID
app.get('/products/:id', async(req, res)=> {
    try {
        const {id} = req.params; //deconstruct the id from the request params
        const product = await Product.findById(id); //instead of using find all prods, use the function to search it by id 
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


//for updating and editing a product in database
app.put('/products/:id', async (req,res) => {
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body); //use update function with 2 parameters, the id and the new change for product 
        if(!product){ //check if product was found in the database
            return res.status(404).json({message: `Cannot find any product with this ID ${id}`})
        }
        const updatedProd = await Product.findById(id);
        res.status(200).json(updatedProd);

    } catch (error) {
        res.status(500).json({message: error.message})
    }
 })


 // for removing/deleting a product from database

 app.delete('/products/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);

        if(!product) {
            return restatus(404).json({message: `Cannot find any product with this ID ${id}`})
        }
        res.status(200).json(product) //if product is successfully deleted, return the prod deleted 

    } catch (error) {
        res.status(500).json({message: error.message})
    }
 }) 


mongoose.set("strictQuery", false)
mongoose.connect('MONGODB_URL')
.then(() => {
    console.log('Connected to MongoDB!')
    app.listen(3000, () => {
        console.log(`Node API is running!`)
    })
}).catch((error) => {
    console.log(error)
})