const asyncHandler = require('express-async-handler');
const Product = require('../model/productModel');
const path = require('path');
const fs = require('fs')

const addProduct = asyncHandler(
   async (req, res) => {
      try {
         const { name, price, quantity } = req.body;
         const images = req.files;
         if (images) {
            var imageArr = req.files.map((file) => file.filename);
         }
         const product = Product.create({
            name,
            price,
            quantity,
            images: imageArr
         });
         if (product) {
            res.status(200).json("product added successfully")
         }
      } catch (error) {
         throw new Error(error)
      }
   }
);

//get product
const getProduct = asyncHandler(
   async (req, res) => {
      try {
         let products = await Product.find();
         if (products) {
            res.status(200).json(products)
         }
      } catch (error) {
         throw new Error(error)
      }
   }
);

//edit product
const editProduct = asyncHandler(
   async (req, res) => {
      try {
         const id = req.params.id
         let products = await Product.findById(id);
         if (products) {
            res.status(200).json(products)
         }
      } catch (error) {
         throw new Error(error)
      }
   }
);


//update product
const updateProduct = asyncHandler(async (req, res) => {
   const productId = req.params.id;
 
   try {
     // Retrieve the list of old file paths from the database
     const product = await Product.findById(productId);
 
     if (product) {
       const oldImages = product.images || [];
 
       // Update the database with non-file data (req.body)
       const { name, price, quantity } = req.body;
 
       // Include the new file paths in the update only if new files are present
       const updateData = {
         name,
         price,
         quantity,
       };
 
       if (req.files && req.files.length > 0) {
         // Delete old images from the static folder
         await deleteOldImages(oldImages);
 
         // Include the new file paths in the update
         updateData.images = req.files.map((file) => file.filename);
       }
 
       await Product.findByIdAndUpdate(productId, updateData);
 
       // Respond with success
       res.status(200).json({ message: 'Update successful' });
     } else {
       res.status(404).json({ error: 'Product not found' });
     }
   } catch (error) {
     console.error('Error updating:', error);
     res.status(500).json({ error: 'Internal Server Error' });
   }
 });
 

// Function to delete old images from the static folder
async function deleteOldImages(imagesToDelete) {
   if (imagesToDelete) {
      for (const filename of imagesToDelete) {
         const imagePath = path.join(__dirname, '../public/images', filename);

         await fs.promises.unlink(imagePath);
      }
   }
}

module.exports = updateProduct;



//delete product
const deleteProduct = asyncHandler(
   async (req, res) => {
      try {
         const id = req.params.id;
         const product = await Product.findById(id);
         if (product) {
            const imagesToDelete = product?.images;
            if (imagesToDelete) {
               for (const filename of imagesToDelete) {
                  const imagePath = path.join(__dirname, '../public/images', filename);

                  await fs.promises.unlink(imagePath);
               }
            }


            await Product.deleteOne({ _id: id })
            res.status(200).send('product deleted successfully');
         }

      } catch (error) {
         console.error('Error deleting images', error);
         res.status(500).send('Internal Server Error');
      }
   }
);


module.exports = { addProduct, getProduct, deleteProduct,editProduct ,updateProduct}