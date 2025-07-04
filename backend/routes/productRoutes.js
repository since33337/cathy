const express=require('express');
const router=express.Router();
const productControllers=require('../controllers/productControllers');
const path =require('path');
const multer = require('multer');

// configuration de multer (stockage des fichiers dans /uploads)

const storage =multer.diskStorage({
destination:function(req,file,cb){
    cb(null,'uploads/');
},
filename:function(req,file,cb){
    cb(null,Date.now()  + path.extname(file.originalname));
},
});

const upload =multer({storage}) //  telechargement de fichier dans uploads/

router.get('/',productControllers.getAllProduct);
router.get('/:id',productControllers.getProductById);
router.post('/', upload.single('image'), productControllers.addProduct);
router.put('/:id', upload.single('image'), productControllers.updateProduct);
router.delete('/:id',productControllers.deleteProduct);

module.exports=router;
 