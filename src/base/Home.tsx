import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import CategorySection from "../components/CategorySection";
import EndSection from "../components/EndSection";
import Product from "../contents/home/Product";


const Home: React.FC = () => {
    return (
        <>
            <Navbar></Navbar>
            <Hero></Hero>
            <CategorySection></CategorySection>
            <EndSection></EndSection>
            <Product></Product>
        </>

    )
}

export default Home;