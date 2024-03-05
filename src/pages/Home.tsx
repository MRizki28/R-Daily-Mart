import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import CategorySection from "../components/CategorySection";
import EndSection from "../components/EndSection";


const Home: React.FC = () => {
    return (
        <>
            <Navbar></Navbar>
            <Hero></Hero>
            <CategorySection></CategorySection>
            <EndSection></EndSection>
        </>

    )
}

export default Home;