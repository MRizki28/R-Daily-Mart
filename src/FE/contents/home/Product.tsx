import React, { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import axios from "axios";
// import productFunction from "../../functions/product";
import { IoCartOutline } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";

interface Product {
    id: string
    product_image: string,
    id_type_product: string,
    product_name: string,
    price: number,
    typeProduct: TypeProduct;
}
interface TypeProduct {
    id: string;
    type_product: string;
}

const Product: React.FC = () => {
    const [dataProduct, setDataProduct] = useState<Product[]>([])
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState(1);

    const getDataProduct = async (page: number) => {
        try {
            const response = await axios.get(`http://localhost:3002/product?page=${page}`)
            const responseData = response.data.data;
            if (page == 1) {
                setDataProduct(responseData.data)
            } else {
                setDataProduct(prevProducts => [...prevProducts, ...responseData.data])
            }
            setTotalPages(responseData.totalPages)

            console.log(responseData)
        } catch (error) {
            console.log(error)
        }
    }

    const handleAddCart = async (id: string) => {
        try {
            const response = await axios.post(`http://localhost:3002/cart/create/${id}`)
            console.log(response)
            if (response.data.message == 'success') {
                toast.success("Sukses tambah ke keranjang")
            }
        } catch (error) {
            console.log(error)
            toast.error("Gagal menambahkan ke keranjang");
        }
    }

    useEffect(() => {
        getDataProduct(currentPage)
    }, [currentPage])

    const handleLoadMore = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    return (
        <>
            <ToastContainer />
            <section className="max-w-[1140px] mx-auto ">
                <div className="header">
                    <h3 className="font-bold text-xl mb-5">Product</h3>
                </div>
                <div className="grid grid-cols-2 gap-4  p-3 lg:grid  lg:grid-cols-5" >
                    {dataProduct.map((item, index) => (
                        <div key={index} className="flex flex-col border rounded-md p-3 hover:border-orange-500 hover:shadow-2xl transition duration-300">
                            <div>
                                <img src={`http://localhost:3002/product/image/${item.product_image}`} width="100%" height="50%" alt="product" />
                            </div>
                            <div className="text-sm text-slate-500 mt-2">
                                <span>{item.typeProduct.type_product}</span>
                            </div>
                            <div className="font-bold text-lg">
                                <h2>{item.product_name}</h2>
                            </div>
                            <div className="text-orange-400 text-lg font-bold mb-2">
                                <span>Rp. {item.price}</span>
                            </div>
                            <div className="w-full mt-auto">
                                <Button onClick={() => handleAddCart(item.id)} className="w-full" color="warning">Tambah <IoCartOutline></IoCartOutline></Button>
                            </div>
                        </div>
                    ))}
                </div>
                {currentPage < totalPages && (
                    <div className="text-center mt-5">
                        <button
                            className="border-orange-600 border p-4 rounded-lg hover:bg-orange-500 font-bold"
                            onClick={handleLoadMore}
                        >
                            Muat Lebih Banyak
                        </button>
                    </div>
                )}
            </section>
        </>
    )
}

export default Product