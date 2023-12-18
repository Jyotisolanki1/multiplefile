const mongoose = require('mongoose');


const productSchema = mongoose.Schema({
    name:{
        type: String,
    },
    price:{
        type: String,
    },
    quantity:{
        type: String,
        default : '1'
    },
    images:{
        type:Array,
    }
},
{
    timestapms:true
});
module.exports = mongoose.model("Product", productSchema)
