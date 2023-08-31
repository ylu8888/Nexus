const mongoose = require('mongoose')

//Creating a product Schema
const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Enter a product name"]

        },
        quantity: {
            type: Number,
            required: true,
            default: 0
        },
        price: {
            type: Number,
            required: true,

        },
        image: { 
            type: String,
            required: false, //image is optional
        }
    },
    {
        timestamps: true //tracks when data is added or modified
    }
)

//Creating a product model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;