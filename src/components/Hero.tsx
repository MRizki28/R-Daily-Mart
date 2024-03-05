import React from "react";
import Slider1 from "../assets/image/slider1.jpg";
import Slider2 from "../assets/image/slider2.jpg";
import Slider from "react-slick";

const Hero: React.FC = () => {

    const settings = {
        dots: true,
        autoplay: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <section className="mt-8">
            <div className="max-w-[1140px] mx-auto">
                <Slider {...settings} >
                    <div className="relative">
                        <img src={Slider2} alt="..." className="relative z-10 object-cover" />
                     
                    </div>
                    <div className="relative">
                        <img src={Slider1} alt="..." className="relative z-10 object-cover" />
                        
                    </div>
                </Slider>
            </div>
        </section>
    );
};

export default Hero;
