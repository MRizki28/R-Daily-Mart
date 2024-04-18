import React from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import ProductManagement from "./pages/Product/produtManagement";
import 'react-toastify/dist/ReactToastify.css';

const Product: React.FC = () => {
    return (
        <>
            <Navbar></Navbar>
            <Sidebar></Sidebar>
            <ProductManagement></ProductManagement>
        </>

    )
}

export default Product;