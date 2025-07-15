import React, { useState, useEffect } from 'react';
import './product.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

import ModalEditProduct from '../components/modaleditproduct';
import ModaleViewProduct from '../components/modaleviewproduct';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectProduct] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/products`)
      .then(res => {
        console.log("Données reçues:", res.data);

        if (res.data.data && Array.isArray(res.data.data)) {
          setProducts(res.data.data);
        } else {
          console.error("Pas de données de produits trouvées");
          setProducts([]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Erreur lors de la récupération des produits :", err);
        setProducts([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleView = (product) => {
    setSelectProduct(product);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Supprimer le produit '${name}' ?`)) {
      axios
        .delete(`${import.meta.env.VITE_API_URL}/products/${id}`)
        .then(() => {
          fetchProducts();
        })
        .catch(err => {
          console.error('Erreur suppression:', err);
        });
    }
  };

  if (loading) {
    return <div>Chargement des produits...</div>;
  }

  return (
    <div className='container'>
      <div className='btnAdd'>
        <Link to='/addproduct'>Ajouter un produit</Link>
      </div>

      <div className='tableproduct'>
        <table className='table'>
          <thead>
            <tr>
              <th>Image</th>
              <th>Nom</th>
              <th>Description</th>
              <th>Prix</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(products) && products.length > 0 ? (
              products.map(product => (
                <tr key={product.id}>
                  <td>
                    {product.image && (
                      <img
                        src={`${import.meta.env.VITE_API_URL.replace('/api', '')}/uploads/${product.image}`}
                        alt={product.image || 'Image'}
                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                      />
                    )}
                  </td>
                  <td>{product.nom}</td>
                  <td>{product.description}</td>
                  <td>{parseFloat(product.prix).toFixed(2)}$</td>
                  <td>
                    <button className='btnk' onClick={() => handleView(product)}>Voir</button>
                    <button className='btnk' onClick={() => handleEdit(product)}>Modifier</button>
                    <button className='btnk' onClick={() => handleDelete(product.id, product.nom)}>Supprimer</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='5'>Aucun produit disponible</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedProduct && (
        <ModaleViewProduct
          product={selectedProduct}
          onClose={() => setSelectProduct(null)}
        />
      )}

      {editingProduct && (
        <ModalEditProduct
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onUpdate={fetchProducts}
        />
      )}
    </div>
  );
};

export default Product;
