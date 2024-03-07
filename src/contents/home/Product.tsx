import React from "react";
import product1 from "../../assets/image/product1.jpg"
import { Button } from "flowbite-react";

const Product: React.FC = () => {
    return (
        <section className="max-w-[1140px] mx-auto mt-">
            <div className="header">
                <h3 className="font-bold text-xl mb-5">Product</h3>
            </div>
            <div className="flex flex-wrap gap-3 ">
                <div className="flex space-x-3 p-3">
                    <div className="border rounded-md p-3 hover:border-orange-500 hover:shadow-2xl transition duration-300">
                        <div>
                            <img src={product1} alt="product" />
                        </div>
                        <div className="text-sm text-slate-500">
                            <span>Snack & Munchies</span>
                        </div>
                        <div className="font-bold text-lg">
                            <h2>Haldiram's Sev Bhujia</h2>
                        </div>
                        <div className="text-orange-400 text-lg font-bold mb-2">
                            <span>Rp 15.000</span>
                        </div>
                        <div className="w-full">
                            <Button className="w-full" color="warning">Buy</Button>
                        </div>
                    </div>
                    <div className="border rounded-md p-3 hover:border-orange-500 hover:shadow-2xl transition duration-300">
                        <div>
                            <img src={product1} alt="product" />
                        </div>
                        <div className="text-sm text-slate-500">
                            <span>Snack & Munchies</span>
                        </div>
                        <div className="font-bold text-lg">
                            <h2>Haldiram's Sev Bhujia</h2>
                        </div>
                        <div className="text-orange-400 text-lg font-bold mb-2">
                            <span>Rp 15.000</span>
                        </div>
                        <div className="w-full">
                            <Button className="w-full" color="warning">Buy</Button>
                        </div>
                    </div>
                </div>

            </div>
        </section>

    )
}

export default Product