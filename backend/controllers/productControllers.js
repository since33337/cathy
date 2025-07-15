const db = require('../config/dbconfig');

const getAllProduct = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM product');
        res.status(200).json({ message: 'Produits récupérés avec succès', data: result.rows });
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la récupération des produits', error: err });
    }
};

const getProductById = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await db.query('SELECT * FROM product WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Produit non trouvé' });
        }
        res.status(200).json({ message: 'Produit récupéré avec succès', data: result.rows[0] });
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la récupération du produit', error: err });
    }
};

const addProduct = async (req, res) => {
    const { nom, description, prix } = req.body;

    if (!nom || !description || !prix || isNaN(prix) || Number(prix) <= 0) {
        return res.status(400).json({ message: 'Champs invalides ou manquants' });
    }

    if (!req.file) {
        return res.status(400).json({ message: 'Image requise' });
    }

    const image = req.file.filename;

    try {
        const result = await db.query(
            'INSERT INTO product (nom, description, image, prix) VALUES ($1, $2, $3, $4) RETURNING *',
            [nom, description, image, prix]
        );
        res.status(201).json({ message: 'Produit ajouté avec succès', data: result.rows[0] });
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de l\'ajout du produit', error: err });
    }
};

const updateProduct = async (req, res) => {
    const id = req.params.id;
    const { nom, description, prix } = req.body;
    const image = req.file ? req.file.filename : req.body.image;

    if (!nom || !description || !prix || isNaN(prix) || Number(prix) <= 0) {
        return res.status(400).json({ message: 'Champs invalides ou manquants' });
    }

    try {
        const result = await db.query(
            'UPDATE product SET nom=$1, description=$2, prix=$3, image=$4 WHERE id=$5 RETURNING *',
            [nom, description, prix, image, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Produit non trouvé' });
        }

        res.status(200).json({ message: 'Produit modifié avec succès', data: result.rows[0] });
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la modification', error: err });
    }
};

const deleteProduct = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await db.query('DELETE FROM product WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Produit non trouvé' });
        }

        res.status(200).json({ message: 'Produit supprimé avec succès', data: result.rows[0] });
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la suppression', error: err });
    }
};

module.exports = {
    getAllProduct,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
};
