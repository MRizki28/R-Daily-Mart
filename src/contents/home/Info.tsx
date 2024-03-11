import React from "react";
import { FaRegClock } from "react-icons/fa";
import { GoGift } from "react-icons/go";
import { FiPackage } from "react-icons/fi";
import { LuRefreshCw } from "react-icons/lu";

const Info: React.FC = () => {
    return (
        <section className="mt-9">
            <div className="max-w-[1140px] h-64 mx-auto">
                <div className="grid gap-3 grid-cols-1 p-3 lg:grid-cols-4 space-y-4 lg:space-y-0">
                    <div>
                        <div>
                            <FaRegClock className="w-11 h-full text-orange-500" />
                        </div>
                        <div className="mt-2">
                            <h3 className="text-lg font-bold ">10 minute grocery now</h3>
                        </div>
                        <div className="mt-2">
                            <p className="text-[#5c6c75]">Get your order delivered to your doorstep at the earliest from FreshCart pickup stores near you.</p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <GoGift className="w-11 h-full text-orange-500" />
                        </div>
                        <div className="mt-2">
                            <h3 className="text-lg font-bold ">Best Prices & Offers</h3>
                        </div>
                        <div className="mt-2">
                            <p className="text-[#5c6c75]">Cheaper prices than your local supermarket, great cashback offers to top it off. Get best pricess & offers.</p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <FiPackage className="w-11 h-full text-orange-500" />
                        </div>
                        <div className="mt-2">
                            <h3 className="text-lg font-bold ">Wide Assortment</h3>
                        </div>
                        <div className="mt-2">
                            <p className="text-[#5c6c75]">Choose from 5000+ products across food, personal care, household, bakery, veg and non-veg & other categories.</p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <LuRefreshCw className="w-11 h-full text-orange-500" />
                        </div>
                        <div className="mt-2">
                            <h3 className="text-lg font-bold ">Easy Returns</h3>
                        </div>
                        <div className="mt-2">
                            <p className="text-[#5c6c75]">
                                Not satisfied with a product? Return it at the doorstep & get a refund within hours. No questions asked
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Info