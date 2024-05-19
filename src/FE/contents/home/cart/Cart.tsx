import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import { toast } from "react-toastify";

interface CartProps {
    cartData: any[];
    refreshCartData: () => void;
}

const Cart: React.FC<CartProps> = ({ cartData, refreshCartData }) => {

    let totalPrice = 0
    for (let i = 0; i < cartData.length; i++) {
        totalPrice += cartData[i].typeProduct.price;
    }

    const handleDelete = async (id: string) => {
        try {
            const response = await axios.delete(`http://localhost:3002/cart/delete/${id}`)
            if (response.data.code === 200) {
                toast.success("Sukses delete data");
                refreshCartData();
            } else {
                toast.error("Failed delete")
            }
            console.log(response);
        } catch (error) {
            console.log("Error:", error)
        }
    }

    return (
        <dialog id="my_modal_2" className="modal">
            <div className="modal-box">
                <div className="modal-header border-b-4 mb-4">
                    <h3 className="font-bold text-lg mb-3">Shopping Cart</h3>
                </div>

                <div className="cart-body">
                    {cartData.length === 0 ? (
                        <div className="text-center py-4 flex justify-center items-center flex-col">
                            <IoCartOutline className="text-4xl text-orange-500" />
                            <h3 className="font-bold">Wah Keranjang Belanjaanmu Kosong</h3>
                        </div>
                    ) : (
                        <div className="relative overflow-x-auto max-h-80 shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-16 py-3">
                                            <span className="sr-only">Image</span>
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Product
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Price
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartData.map((item, index) => (
                                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td className="p-4">
                                                <img src={`http://localhost:3002/product/image/${item.typeProduct.product_image}`} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
                                            </td>
                                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                                {item.typeProduct.product_name}
                                            </td>
                                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                                {item.typeProduct.price}
                                            </td>
                                            <td className="px-6 py-4">
                                                <a href="#" onClick={() => handleDelete(item.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    <div className="border rounded-lg mt-4">
                        <div className="info-header p-3">
                            <h3 className="font-bold text-lg mb-3">Order Summary</h3>
                        </div>
                        <div className="p-3">
                            <dl className="flex justify-between font-bold">
                                <dt>Total</dt>
                                <dd>{totalPrice}</dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
}

export default Cart;
