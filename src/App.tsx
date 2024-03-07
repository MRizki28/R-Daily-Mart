import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './base/Home';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home></Home>}></Route>
    </Routes>
  );
}

export default App;
