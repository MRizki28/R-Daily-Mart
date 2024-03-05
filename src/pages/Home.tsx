import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import CategorySection from "../components/CategorySection";


const Home: React.FC = () => {
    return (
        <>
            <Navbar></Navbar>
            <Hero></Hero>
            <CategorySection></CategorySection>
        </>

    )
}

export default Home;