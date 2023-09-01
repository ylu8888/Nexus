const Product = require('../models/productModel')

//this will retrieve ALL products
const getProducts = async(req, res) => { //the logic from the productRoute for getting all prods
    try {
        const products = await Product.find({}) 
        res.status(200).json(products) //put the product display in json
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

//this will retrieve a single prod
const getProduct = async(req, res)=> {
    try {
        const {id} = req.params; //deconstruct the id from the request params
        const product = await Product.findById(id); //instead of using find all prods, use the function to search it by id 
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

//route for saving data into database
const createProduct = async(req, res) => {
    try{
        //since we need to save data to database, we have to save it through product Model
        //when interacting with database, use await
        const product = await Product.create(req.body) //creating new product in the database
        res.status(200).json(product);
        
        
        } catch (error) {
        console.log(error.message); //show the errors
        res.status(500).json({message: error.message})
        }
         
}

//for updating and editing a product in database
const updateProduct = async (req,res) => {
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
 }

  // for removing/deleting a product from database
const deleteProduct = async (req, res) => {
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
 }

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct


}