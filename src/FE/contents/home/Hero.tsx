import React from "react";
import Slider1 from "../../assets/image/slider1.jpg";
import Slider2 from "../../assets/image/slider2.jpg";
import Slider from "react-slick";

const Hero: React.FC = () => {

    const settings = {
        dots: true,
        autoplay: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
    };

    return (
        <section className="mt-8 p-3">
            <div className="max-w-[1140px] mx-auto">
                <Slider {...settings} >
                    <div className="relative">
                        <img src={Slider2} alt="..." className="relative z-10 object-cover" />
                        <div className="hidden lg:flex absolute top-0 left-10 z-20 w-full h-full items-center ">
                            <div className=" py-14 px-8 text-xs-center">
                                <span className="border bg-orange-400 p-1 text-md rounded-md font-bold">Opening Sale Discount 50%</span>
                                <h2 className="font-bold text-4xl font-sans mt-4 mb-3">SuperMarket For Fresh <br /> Grocery</h2>
                                <p className="font-medium text-[#5c6c75] mb-7">Introduced a new model for online grocery shopping and <br /> convenient home delivery.</p>
                                <a href="#!" className="rounded-md  bg-[#001e2b] hover:bg-slate-700   text-white font-medium p-3">
                                    Shop Now
                                    <i className="feather-icon icon-arrow-right ms-1"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <img src={Slider1} alt="..." className="relative z-10 object-cover" />
                        <div className="hidden lg:flex absolute top-0 left-10 z-20 w-full h-full  items-center ">
                            <div className=" py-14 px-8 text-xs-center">
                                <span className="border bg-orange-400 p-1 text-md rounded-md font-bold">Opening Sale Discount 50%</span>
                                <h2 className="font-bold text-4xl font-sans mt-4 mb-3">SuperMarket For Fresh <br /> Grocery</h2>
                                <p className="font-medium text-[#5c6c75] mb-7">Introduced a new model for online grocery shopping and <br /> convenient home delivery.</p>
                                <a href="#!" className="rounded-md  bg-[#001e2b] hover:bg-slate-700  text-white font-medium p-3">
                                    Shop Now
                                    <i className="feather-icon icon-arrow-right ms-1"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </Slider>
            </div>
        </section>
    );
};

export default Hero;
