import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../contents/home/Hero";
import CategorySection from "../contents/home/CategorySection";
import EndSection from "../contents/home/EndSection";
import Product from "../contents/home/Product";
import Info from "../contents/home/Info";


const Home: React.FC = () => {
    return (
        <>
            <Navbar></Navbar>
            <Hero></Hero>
            <CategorySection></CategorySection>
            <EndSection></EndSection>
            <Product></Product>
            <Info></Info>
        </>

    )
}

export default Home;