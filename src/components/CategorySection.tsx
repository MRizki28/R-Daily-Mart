import React from "react";
import Slider from "react-slick"
import category1 from "../assets/image/category1.jpg"
import category2 from "../assets/image/category2.jpg"
import category3 from "../assets/image/category3.jpg"
import category4 from "../assets/image/category4.jpg"

const CategorySection: React.FC = () => {
    const settings = {
        autoplay: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 768, 
                settings: {
                    slidesToShow: 2 
                }
            }
        ]
    };

    const category = [
        { img: category1, title: 'Baby Care' },
        { img: category2, title: 'Fish , Meat & Chicken' },
        { img: category3, title: 'Cleaning Essential' },
        { img: category4, title: 'Rice and Gandum' }
    ];

    return (
        <section className="mt-20 p-3 ">
            <div className="max-w-[1140px] h-64 mx-auto">
                <div className="header">
                    <h3 className="font-bold text-xl mb-5">Featured Categories</h3>
                </div>
                <Slider {...settings} className="testing-slider">
                    {category.map((item, index) => (
                        <div key={index} className="rounded overflow-hidden border p-4">
                            <div className="text-center flex justify-center items-center flex-col">
                                <img src={item.img} alt="product1" />
                                <span className="mt-2">{item.title}</span>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    )
}

export default CategorySection