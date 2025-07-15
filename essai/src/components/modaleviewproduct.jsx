import React from 'react';
import './Modal.css';

const ModaleViewProduct = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className='modal-overlay'>
      <div className='modal'>
        <h2>Détail du produit</h2>
        <img
          src={`${import.meta.env.VITE_API_URL}/products/uploads/${product.image}`}
          alt={product.nom}
          className='modal-image'
        />
        <p><strong>Nom: </strong>{product.nom}</p>
        <p><strong>Description: </strong>{product.description}</p>
        <p><strong>Prix: </strong>{parseFloat(product.prix).toFixed(2)}$</p>
        <button onClick={onClose} className='btn-close'>Fermer</button>
      </div>
    </div>
  );
};

export default ModaleViewProduct;
