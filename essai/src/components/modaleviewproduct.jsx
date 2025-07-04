import React from 'react';
import './Modal.css';

const ModaleViewProduct = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className='modal-overlay'> {/* ✅ Corrigé: modal-overlay au lieu de madal-overlay */}
      <div className='modal'>
        <h2>Détail du produit</h2>
        <img
          src={`http://localhost:8800/uploads/${product.image}`} /* ✅ Corrigé: 8800 au lieu de 800 */
          alt={product.nom}
          className='modal-image'
        />
        <p><strong>Nom: </strong>{product.nom}</p> {/* ✅ Ajout d'un espace après : */}
        <p><strong>Description: </strong>{product.description}</p>
        <p><strong>Prix: </strong>{parseFloat(product.prix).toFixed(2)}$</p> {/* ✅ Corrigé: .toFixed(2) au lieu de .toFixed */}
        <button onClick={onClose} className='btn-close'>Fermer</button>
      </div>
    </div>
  );
};

export default ModaleViewProduct;
