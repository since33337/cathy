import React, { useState } from 'react';
import './Modal.css';
import axios from 'axios';

const ModalEditproduct = ({ product, onClose, onUpdate }) => {
  // Prévisualisation de l'image et gestion des données du formulaire
  const [previewImage, setPreviewImage] = useState(
    `${import.meta.env.VITE_API_URL}/uploads/${product.image}`
  );
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    nom: product.nom,
    description: product.description,
    prix: product.prix,
    image: null, // image sélectionnée (nouvelle)
  });

  // Gestion changement champs texte
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Gestion changement image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const filetypes = ['image/jpeg', 'image/png', 'image/gif'];

    if (file && filetypes.includes(file.type)) {
      setFormData(prev => ({ ...prev, image: file }));
      setPreviewImage(URL.createObjectURL(file));
      setErrorMessage('');
    } else {
      setErrorMessage('Veuillez sélectionner une image valide (JPEG, PNG ou GIF)');
    }
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateData = new FormData();
    updateData.append('nom', formData.nom);
    updateData.append('description', formData.description);
    updateData.append('prix', formData.prix);

    if (formData.image) {
      updateData.append('image', formData.image);
    }

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/products/${product.id}`,
        updateData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      onUpdate(); // recharger la liste des produits
      onClose(); // fermer la modale
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

          <label>Image actuelle</label><br />
          {previewImage && (
            <img
              src={previewImage}
              alt='Aperçu'
              style={{ width: 80, height: 80, objectFit: 'cover', marginBottom: 10 }}
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
