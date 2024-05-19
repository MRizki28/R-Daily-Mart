import React from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import ProductManagement from "./pages/Product/produtManagement";
import TypeProductManagement from "./pages/TyperProduct/typeProductManagement";

const TypeProduct: React.FC = () => {
    return (
        <>
            <Navbar></Navbar>
            <Sidebar></Sidebar>
            <TypeProductManagement></TypeProductManagement>
        </>

    )
}

export default TypeProduct;