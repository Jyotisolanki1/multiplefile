const router = require('express').Router();
const {addProduct,getProduct,deleteProduct,editProduct, updateProduct} = require('../controller/productController');
const multer =  require('multer');
const path = require('path');

///multer functionality
const  storage = multer.diskStorage({
    destination :(req,file,cb)=>{
     cb(null,'public/images')
    },
    filename:(req, file, cb)=> {
     cb(null,file.fieldname+ '_'+Date.now() + path.extname(file.originalname)) 
   }
   })
   
   
   const upload = multer({
       storage: storage
   })

router.post('/addProduct',upload.array('file'),addProduct);
router.get('/',getProduct);
router.post('/delete/:id',deleteProduct);
router.get('/edit/:id',editProduct);
router.put('/update/:id',upload.array('file'),updateProduct);

module.exports =router;