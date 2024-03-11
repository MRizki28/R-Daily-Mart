import React from "react";
import groceryBanner from "../../assets/image/endsection1.png";

const EndSection: React.FC = () => {
    return (
        <section className="mt-5">
            <div className="max-w-[1140px] h-96 lg:h-56 mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="py-10 px-8 rounded bg-cover bg-center" style={{ backgroundImage: `url(${groceryBanner})` }}>
                        <div>
                            <h3 className="font-bold mb-1">Fruits & Vegetables</h3>
                            <p className="mb-4">Get Upto <span className="font-bold">30%</span> Off</p>
                            <a href="#" className="rounded-md  bg-[#001e2b] hover:bg-slate-700   text-white font-medium p-3">
                                Shop Now
                                <i className="feather-icon icon-arrow-right ms-1"></i>
                            </a>
                        </div>
                    </div>
                    <div className="py-10 px-8 rounded bg-cover bg-center" style={{ backgroundImage: `url(${groceryBanner})` }}>
                        <div>
                            <h3 className="font-bold mb-1">Fruits & Vegetables</h3>
                            <p className="mb-4">Get Upto <span className="font-bold">30%</span> Off</p>
                            <a href="#" className="rounded-md  bg-[#001e2b] hover:bg-slate-700   text-white font-medium p-3">
                                Shop Now
                                <i className="feather-icon icon-arrow-right ms-1"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EndSection;
