import React from "react";

const Footer: React.FC = () => {
    return (
        <footer className="bg-[#f0f3f2]">
            <div className="max-w-[1140px] mx-auto p-3">
                <div className="border-b-4">
                    <div>
                        <div className="">
                            <h6 className="text-lg font-bold mb-4">Categories</h6>
                            <div className="flex">
                                <div className="w-[48%] lg:w-[17%]">
                                    <ul className="font-sans text-sm text-[#5c6c75]">
                                        <li className="mb-2"><a href="#!" >Vegetables &amp; Fruits</a></li>
                                        <li className="mb-2"><a href="#!" > Breakfast &amp; instant food</a></li>
                                        <li className="mb-2"><a href="#!" > Bakery &amp; Biscuits</a></li>
                                        <li className="mb-2"><a href="#!" >Atta, rice &amp; dal</a></li>
                                        <li className="mb-2"><a href="#!" >Sauces &amp; spreads</a></li>
                                        <li className="mb-2"><a href="#!" >Organic &amp; gourmet</a></li>
                                        <li className="mb-2"><a href="#!" > Baby care</a></li>
                                        <li className="mb-2"><a href="#!" >Cleaning essentials</a></li>
                                        <li className="mb-2"><a href="#!" >Personal care</a></li>
                                    </ul>
                                </div>
                                <div className="w-[48%] lg:w-[17%]">
                                    <ul className="font-sans text-sm text-[#5c6c75]">
                                        <li className="mb-2"><a href="#!" >Dairy, bread &amp; eggs</a></li>
                                        <li className="mb-2"><a href="#!" > Cold drinks &amp; juices</a></li>
                                        <li className="mb-2"><a href="#!" > Tea, coffee &amp; drinks</a></li>
                                        <li className="mb-2"><a href="#!" >Masala, oil &amp; more</a></li>
                                        <li className="mb-2"><a href="#!" >Chicken, meat &amp; fish</a></li>
                                        <li className="mb-2"><a href="#!" >Paan corner</a></li>
                                        <li className="mb-2"><a href="#!" > Pharma &amp; wellness</a></li>
                                        <li className="mb-2"><a href="#!" >Home &amp; office</a></li>
                                        <li className="mb-2"><a href="#!" >Pet care</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer