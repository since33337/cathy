const express= require('express');
const cors=require('cors')
const multer=require('multer');


const productRoutes=require('./routes/productRoutes');
const PORT=8800;

const app=express() // application express
app.use('/uploads',express.static('uploads'));
app.use(express.json()) // afficher les donnees sous form de json
app.use(express.urlencoded({extended:true})) // pour les formulaires html


app.use(cors({
    origin:['http://localhost:5173'],
    methods:['GET','POST','PUT','DELETE'],
}))
app.use('/api/products',productRoutes);


app.listen(PORT,()=>{
    console.log(`serveur s'execute sur http://localhost:${PORT}`);
});
