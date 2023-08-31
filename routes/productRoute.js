const express = require('express');
const router = express.Router();
const Product = require('../models/productModel')


//route for saving data into database
router.post('/products', async(req, res) => {
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
router.get('/products', async(req, res) => {
    try {
        const products = await Product.find({}) 
        res.status(200).json(products) //put the product display in json
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//this will retrieve product by ID
router.get('/products/:id', async(req, res)=> {
    try {
        const {id} = req.params; //deconstruct the id from the request params
        const product = await Product.findById(id); //instead of using find all prods, use the function to search it by id 
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


//for updating and editing a product in database
router.put('/products/:id', async (req,res) => {
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

 router.delete('/products/:id', async (req, res) => {
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


 module.exports = router;