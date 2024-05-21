import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './FE/base/Home';
import Prod from './BE/ProductManagement';
import Product from './BE/ProductManagement';
import TypeProduct from './BE/TypeProductManagement';
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from './FE/protectedRoute/protectedRoute';
import Auth from './BE/pages/Auth/auth';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/cms/login' element={<Auth />} />
      <Route path="/cms/admin" element={<ProtectedRoute element={<Product />} />} />
      <Route path="/cms/typeproduct" element={<ProtectedRoute element={<TypeProduct />} />} />
    </Routes>
  );
}

export default App;
