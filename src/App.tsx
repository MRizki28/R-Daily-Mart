import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './FE/base/Home';
import Admin from './BE/Admin';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home></Home>}></Route>
      <Route path='/cms/admin' element={<Admin></Admin>}></Route>
    </Routes>
  );
}

export default App;
