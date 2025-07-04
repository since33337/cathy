import React from 'react';
import './Modal.css';
import axios from 'axios';
import { useState } from 'react';

const ModalEditproduct = ({ product, onClose, onUpdate }) => {
  // Données du formulaire ou de la table
  const [previewImage, setPreviewImage] = useState(`http://localhost:8800/uploads/${product.image}`);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    nom: product.nom,
    description: product.description,
    prix: product.prix,
    image: null, // l'image sélectionnée
  });

  // Gérer le changement des champs de texte
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Gérer le chargement de l'image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const filetypes = ['image/jpeg', 'image/png', 'image/gif'];
    
    if (file && filetypes.includes(file.type)) { // ✅ Corrigé: file.type au lieu de file.types
      setFormData(prev => ({
        ...prev,
        image: file
      }));
      setPreviewImage(URL.createObjectURL(file));
      setErrorMessage('');
    } else {
      setErrorMessage('Veuillez sélectionner une image valide (JPEG, PNG ou GIF)');
    }
  };

  // FONCTION POUR LA SOUMISSION DU FORMULAIRE
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateData = new FormData();
    updateData.append('nom', formData.nom);
    updateData.append('description', formData.description);
    updateData.append('prix', formData.prix);
    
    // Ajouter la nouvelle image uniquement si elle a été modifiée
    if (formData.image) {
      updateData.append('image', formData.image);
    }

    try {
      // ✅ Corrigé: URL complète avec // après http:
      await axios.put(`http://localhost:8800/api/products/${product.id}`, updateData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      onUpdate(); // recharger les produits après modification
      onClose(); // on ferme le Modal
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      setErrorMessage('Erreur lors de la mise à jour');
    }
  };

  return (
    <div className='modal-overlay'>
      <div className='modal'>
        <h2>Modifier le produit</h2>
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
          {/* ✅ Corrigé: Ajout des attributs name et value correctes */}
          <input
            type='text'
            name='nom'
            value={formData.nom}
            onChange={handleChange}
            placeholder='Nom du produit'
            required
          />
          
          <textarea
            name='description'
            value={formData.description}
            onChange={handleChange}
            placeholder='Description du produit'
            required
          />
          
          <input
            type='number'
            name='prix'
            value={formData.prix}
            onChange={handleChange}
            placeholder='Prix'
            step='0.01'
            min='0'
            required
          />
          
          <label htmlFor='image'>Image Actuelle</label><br />
          {previewImage && (
            <img 
              src={previewImage} 
              alt='Aperçu' 
              style={{
                width: '80px', 
                height: '80px', 
                objectFit: 'cover', // ✅ Corrigé: objectFit au lieu de objectif
                marginBottom: '10px'
              }} 
            />
          )}
          
          <input
            type='file'
            name='image'
            onChange={handleImageChange}
            accept='image/*'
          />
          
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          
          <div className='modal-buttons'>
            <button type='submit' className='btn-save'>Enregistrer</button>
            <button type='button' className='btn-cancel' onClick={onClose}>Annuler</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalEditproduct;
