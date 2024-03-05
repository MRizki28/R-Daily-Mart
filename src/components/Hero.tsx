import React from "react";
import Slider1 from "../assets/image/slider1.jpg"
import Slider2 from "../assets/image/slider2.jpg"
import { Carousel } from "flowbite-react";

const Hero: React.FC = () => {
    return (
        <section className="mt-8">
            <div className="max-w-[1140px] mx-auto">
                <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
                    <Carousel>
                        <img src={Slider2} alt="..." />
                        <img src={Slider1} alt="..." />
                    </Carousel>
                </div>
            </div>
        </section>



    )
}

export default Hero