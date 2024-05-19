import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './FE/base/Home';
import Prod from './BE/ProductManagement';
import Product from './BE/ProductManagement';
import TypeProduct from './BE/TypeProductManagement';
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
    <Routes>
      <Route path='/' element={<Home></Home>}></Route>
      <Route path='/cms/admin' element={<Product></Product>}></Route>
      <Route path='/cms/typeproduct' element={<TypeProduct></TypeProduct>}></Route>
    </Routes>
  );
}

export default App;
