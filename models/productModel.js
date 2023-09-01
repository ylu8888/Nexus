const mongoose = require('mongoose')

//Creating a product Schema
const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Enter a product name"]

        },
        description: {
            type: String,
            required: true,
            default: "No description"
        },
        year: {
            type: String,
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