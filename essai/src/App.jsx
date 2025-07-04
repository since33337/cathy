import React from 'react'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddProduct from './pages/addProduct';
import Product from './pages/product';


const App = () => {
  return (
    <div>
        
            <Routes>
            <Route path="/" element={<Product />} />
            <Route path="/addproduct" element={<AddProduct />} />
            </Routes>
        
    </div>
  )
}

export default App
