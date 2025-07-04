const db = require('../config/dbconfig');

const getAllProduct = (req, res) => {
    const sql = 'SELECT * FROM product';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ message: 'Erreur lors de recuperation des produits', error: err });
        return res.status(200).json({ message: 'recuperation des produits avec succes', data: results });
    });
};

const getProductById = (req, res) => { // ERREUR CORRIGÉE: nom de fonction était "getProductBId"
    const id = req.params.id;
    const sql = 'SELECT * FROM product WHERE id=?'; // ERREUR CORRIGÉE: était "SELECT * FROM WHERE product id=?"
    db.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ message: 'erreur lors de la recuperation d\'un seule produit', error: err });
        
        // AMÉLIORATION: Vérifier si le produit existe
        if (results.length === 0) {
            return res.status(404).json({ message: 'Produit non trouvé' });
        }
        
        return res.status(200).json({ message: 'produit recuperer avec succes', data: results[0] });
    });
};

const addProduct = (req, res) => {
    const { nom, description, prix } = req.body;
    
    // Vérification des champs obligatoires
    if (!nom || !description || !prix || isNaN(prix) || Number(prix) <= 0) {
        return res.status(400).json({
            message: 'Tous les champs sont requis et le prix doit être un nombre positif'
        });
    }
    
    // Vérification de l'image envoyée
    if (!req.file) {
        return res.status(400).json({
            message: 'L\'image du produit est requise'
        });
    }
    
    const image = req.file.filename; // nom du fichier image enregistré par Multer
    
    // Insertion dans la base de données
    db.query(
        'INSERT INTO product(nom, description, image, prix) VALUES(?, ?, ?, ?)',
        [nom, description, image, prix],
        (err, results) => {
            if (err) {
                console.error('Erreur SQL :', err);
                return res.status(500).json({
                    message: 'Erreur lors de l\'ajout du produit',
                    error: err
                });
            }
            return res.status(201).json({
                message: 'Produit ajouté avec succès',
                data: {
                    id: results.insertId,
                    nom,
                    description,
                    image,
                    prix
                }
            });
        }
    );
};

const updateProduct = (req, res) => { // ERREUR CORRIGÉE: nom de fonction était "UpdateProduct" (convention camelCase)
    const { nom, description, prix } = req.body;
    const id = req.params.id;
    const image = req.file ? req.file.filename : req.body.image; // conserver l'ancien image
    
    // AMÉLIORATION: Validation des données
    if (!nom || !description || !prix || isNaN(prix) || Number(prix) <= 0) {
        return res.status(400).json({
            message: 'Tous les champs sont requis et le prix doit être un nombre positif'
        });
    }
    
    const sql = 'UPDATE product SET nom=?, description=?, prix=?, image=? WHERE id=?';
    db.query(sql, [nom, description, prix, image, id], (err, results) => {
        if (err) return res.status(500).json({ message: 'erreur lors de la modification du produit', error: err }); // ERREUR CORRIGÉE: message était "modification de l.image"
        
        // AMÉLIORATION: Vérifier si le produit a été modifié
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Produit non trouvé' });
        }
        
        return res.status(200).json({ message: 'produit modifier avec succes', data: results });
    });
};

const deleteProduct = (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM product WHERE id=?';
    db.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ message: 'echec lors de la suppression d\'un produit', error: err }); // ERREUR CORRIGÉE: était "d.un produit"
        
        // AMÉLIORATION: Vérifier si le produit a été supprimé
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Produit non trouvé' });
        }
        
        return res.status(200).json({ message: 'produit supprimer avec succes', data: results });
    });
};

module.exports = {
    getAllProduct,
    getProductById, // ERREUR CORRIGÉE: était "getProductBId"
    addProduct,
    updateProduct, // ERREUR CORRIGÉE: était "UpdateProduct"
    deleteProduct
};
