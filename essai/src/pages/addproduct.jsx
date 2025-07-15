import React, { useState } from 'react';
import axios from 'axios';
import './addproduct.css';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    nom: '',
    description: '',
    image: null,
    prix: ''
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const navigate=useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const filetypes = ['image/jpeg', 'image/png', 'image/gif'];

    if (file && filetypes.includes(file.type)) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
      setError('');
    } else {
      setError('Veuillez sélectionner un fichier image valide (JPEG, PNG ou GIF)');
      setFormData(prev => ({
        ...prev,
        image: null
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = new FormData();
    productData.append('nom', formData.nom);
    productData.append('description', formData.description);
    productData.append('prix', formData.prix);

    if (formData.image) {
      productData.append('image', formData.image);
    }

    try {
     const response = await axios.post(`${import.meta.env.VITE_API_URL}/products`, productData,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setSuccessMessage('Produit ajouté avec succès !');
      setError('');
      setFormData({
        nom: '',
        description: '',
        image: null,
        prix: ''
      });
      setTimeout(()=>{
        navigate('/')
      },2000)

    } catch (error) {
      console.error("Erreur lors de l'ajout du produit :", error);
      setError(error.response?.data?.message || "Erreur lors de l'ajout du produit");
      setSuccessMessage('');
    }
  };

  return (
    <div className='container'>
      <div className='form-product'>
        <h3 className='title-product'>Ajouter un produit</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor='nom'>Nom du produit</label>
          <input
            type='text'
            name='nom'
            value={formData.nom}
            placeholder='Nom du produit'
            onChange={handleChange}
            required
          />

          <label htmlFor='description'>Description du produit</label>
          <textarea
            name='description'
            value={formData.description}
            onChange={handleChange}
            placeholder='Description du produit'
            required
          />

          <label htmlFor='prix'>Prix du produit</label>
          <input
            type='number'
            name='prix'
            value={formData.prix}
            onChange={handleChange}
            placeholder='Le prix du produit'
            required
          />

          <label htmlFor='image'>Image</label>
          <input
            type='file'
            name='image'
            onChange={handleImageChange}
            accept='image/*'
            required
          />

          <button type='submit' className='btnAdd'>Ajouter le produit</button>

          {successMessage && <p className='success'>{successMessage}</p>}
          {error && <p className='error'>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
