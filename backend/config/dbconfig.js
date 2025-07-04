const mysql= require('mysql');

// creer la connexion a la base de donnees 
const db = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'',
  database:'ecom'  
})
// connexion a la base de donnees 
db.connect(err=>{
    if(err){
        console.error('Erreur de connexion a al base de donnees :',err);
    }else{
        console.log('connecte a la base de donnees mysql');
    }
});
module.exports=db
