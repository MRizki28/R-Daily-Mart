import React from "react";
import { Button } from "flowbite-react";
import productFunction from "../../functions/product";

const Product: React.FC = () => {

    return (
        <section className="max-w-[1140px] mx-auto ">
            <div className="header">
                <h3 className="font-bold text-xl mb-5">Product</h3>
            </div>
            <div className="grid grid-cols-2 gap-4  p-3 lg:grid  lg:grid-cols-5" >
                {productFunction.map((item, index) => (
                    <div key={index} className="border rounded-md p-3 hover:border-orange-500 hover:shadow-2xl transition duration-300">
                        <div>
                            <img src={item.img} alt="product" />
                        </div>
                        <div className="text-sm text-slate-500">
                            <span>{item.category}</span>
                        </div>
                        <div className="font-bold text-lg">
                            <h2>{item.title}</h2>
                        </div>
                        <div className="text-orange-400 text-lg font-bold mb-2">
                            <span>{item.price}</span>
                        </div>
                        <div className="w-full">
                            <Button className="w-full" color="warning">Buy</Button>
                        </div>
                    </div>
                ))}

            </div>

        </section>

    )
}

export default Product