import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Select from 'react-select'
import { axiosInstance } from "../../../helper/apiInstance"


interface Product {
    id: string;
    id_type_product: string;
    product_name: string;
    price: number;
    stok: number;
    product_image: string;
}

interface TypeProduct {
    value: string;
    label: string;
}


const ProductManagement: React.FC = () => {
    const { register, handleSubmit: submitForm, formState: { errors }, reset, setValue } = useForm();

    const [productData, setProductData] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [getDataById, setGetDataById] = useState<Product | null>(null)
    const [typePoductData, setTypeProductData] = useState<TypeProduct[]>([]);
    const [selectedTypeProductId, setSelectedTypeProductId] = useState<string | null>(null);
    const [imageUrl, setImageUrl] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: any) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const url = URL.createObjectURL(file);
            setImageUrl(url);
            setValue("img_menu", e.target.value);
        }
    };

    const getAllData = async (page: number) => {
        try {
            const response = await axios.get(`http://localhost:3002/product?page=${page}`);
            if (response.data.message !== "Data not found") {
                console.log(response.data);
                setProductData(response.data.data.data);
                setTotalPages(response.data.data.totalPages);
            }
        } catch (error) {
            console.log(error);
        }
    };

    React.useEffect(() => {
        getAllData(currentPage);
    }, [currentPage]);

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const onSubmit = async (data: any) => {
        try {
            const formData = new FormData();
            formData.append("id_type_product", selectedTypeProductId ?? "");
            formData.append("product_name", data.product_name);
            formData.append("price", data.price);
            formData.append("stok", data.stok);
            if (data.product_image) {
                formData.append("product_image", data.product_image[0]);
            }

            console.log(selectedTypeProductId)
            const response = await axiosInstance.post("http://localhost:3002/product/create", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log(response)
            if (response.data.message === "Check your validation") {
                toast.error("Input tidak boleh kosong!");
            } else {
                toast.success("Sukses tambah produk")
            }
            console.log("Server response:", response.data);
            getAllData(currentPage);
            reset();
        } catch (error) {
            console.log("Error:", error);
        }
    };

    const getDataId = async (id: string) => {
        const response = await axios.get(`http://localhost:3002/product/get/${id}`)
        const data = response.data.data
        setGetDataById(data)
        setSelectedTypeProductId(data.id_type_product);
        console.log(data)
        if (data.product_image) {
            const fileUrl = `http://localhost:3002/product/image/${data.product_image}`;
            const fileName = fileUrl.split('/').pop();

            if (fileName) {
                const blob = await fetch(fileUrl).then(response => response.blob());
                console.log('disini blob', blob);

                const file = new File([blob], fileName);
                const fileList = new DataTransfer();
                fileList.items.add(file);

                if (fileInputRef.current) {
                    fileInputRef.current.files = fileList.files;
                    setImageUrl(URL.createObjectURL(file));
                }
            }
        }
    }

    const handleEdit = async (id: string) => {
        setGetDataById(null);
        setImageUrl("");
        await getDataId(id);
    };

    const handleDelete = async (id: string) => {
        try {
            const confirmed = window.confirm("Apakah Anda yakin ingin menghapus data ini?");
            if (!confirmed) return;

            const response = await axiosInstance.delete(`http://localhost:3002/product/delete/${id}`)
            if (response.data.code === 200) {
                toast.success("Sukses delete data", {
                    autoClose: 1000,
                    onClose: () => {
                        window.location.reload();
                    }
                });

                getAllData(currentPage);
            } else {
                toast.error("Failed delete")
            }
            console.log(response);
        } catch (error) {
            console.log("Error:", error)
        }
    }
    const updateData = async (id: string) => {
        try {
            const formData = new FormData();
            const productName = document.getElementById("product_name") as HTMLInputElement;
            const price = document.getElementById("price") as HTMLInputElement;
            const stok = document.getElementById("stok") as HTMLInputElement;
            const productImage = document.getElementById("product_image") as HTMLInputElement;

            formData.append("id_type_product", selectedTypeProductId ?? "");
            formData.append("product_name", productName.value);
            formData.append("price", price.value);
            formData.append("stok", stok.value);
            if (productImage.files && productImage.files.length > 0) {
                formData.append("product_image", productImage.files[0]);
            }
            const response = await axiosInstance.post(`http://localhost:3002/product/update/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log('response ServerResponse', response)

            if (response.data.message === "Check your validation") {
                toast.error("Input tidak boleh kosong!");
            } else {
                toast.success("Sukses update produk")
                console.log(response.data)
                getAllData(currentPage)
            }
        } catch (error) {
            console.log("Error:", error);
        }
    }

    const handleUpdate = async () => {
        if (!getDataById) return;
        await updateData(getDataById.id);
    }

    const handleBackToForm = () => {
        window.location.reload()
    };

    const getDataTypeProduct = async () => {
        try {
            const response = await axios.get('http://localhost:3002/typeproduct')
            const responseData = await response.data.data
            if (responseData !== undefined) {
                const results = responseData.data.map((data: any) => ({
                    value: data.id,
                    label: data.type_product
                }))
                setTypeProductData(results)
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        getDataTypeProduct()
    }, [])


    return (
        <>
            <ToastContainer />
            <div className="p-4 sm:ml-64">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
                    <div className="header">
                        <nav className="flex px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700" aria-label="Breadcrumb">
                            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                                <li className="inline-flex items-center">
                                    <a href="#" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                                        <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                                        </svg>
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <svg className="rtl:rotate-180 block w-3 h-3 mx-1 text-gray-400 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                        </svg>
                                        <a href="#" className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">Templates</a>
                                    </div>
                                </li>
                                <li aria-current="page">
                                    <div className="flex items-center">
                                        <svg className="rtl:rotate-180  w-3 h-3 mx-1 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                        </svg>
                                        <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">Flowbite</span>
                                    </div>
                                </li>
                            </ol>
                        </nav>
                    </div>
                    <div className="body mt-4">
                        <div className="border p-4 border-gray-200 rounded-lg">
                            <div>
                                <form onSubmit={submitForm(onSubmit)} className="">
                                    <div className="mb-5">
                                        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-white">Type Product</label>
                                        <Select
                                            {...register("id_type_product", { required: true })}
                                            options={typePoductData}
                                            value={selectedTypeProductId ? typePoductData.find(item => item.value === selectedTypeProductId) : null}
                                            id="id_type_product"
                                            onChange={(selectedOption) => {
                                                if (selectedOption) {
                                                    const { value } = selectedOption;
                                                    setSelectedTypeProductId(value);
                                                    setValue("id_type_product", value);
                                                }
                                            }}
                                        />

                                        {!selectedTypeProductId && errors.id_type_product && <span className="text-red-500">Jenis product is required</span>}
                                    </div>
                                    <div className="mb-5">
                                        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-white">Product Name</label>
                                        <input type="text" {...register("product_name", { required: true })} defaultValue={getDataById?.product_name} id="product_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Rice" />
                                        {errors.product_name && <span className="text-red-500">Product name is required</span>}
                                    </div>
                                    <div className="mb-5">
                                        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-white">Price</label>
                                        <input type="number" {...register("price", { required: true })} defaultValue={getDataById?.price} id="price" placeholder="0" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                        {errors.price && <span className="text-red-500">Price is required</span>}
                                    </div>
                                    <div className="mb-5">
                                        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-white">Stok</label>
                                        <input type="number" {...register("stok", { required: true })} defaultValue={getDataById?.stok} id="stok" placeholder="0" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                        {errors.stok && <span className="text-red-500">Stok is required</span>}
                                    </div>
                                    {getDataById === null ? (
                                        <div>
                                            <div className="mb-5">
                                                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-white">Product Image</label>
                                                <input type="file"  {...register("product_image", { required: true })} name="product_image" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                                {errors.product_image && <span className="text-red-500">Product image is required</span>}
                                            </div>

                                            <button type="submit" className="text-white flex ml-auto bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">+</button>
                                        </div>
                                    ) : (
                                        <div>
                                            <div className="mb-5">
                                                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-white">Gambar Produk</label>
                                                <div className="">
                                                    <input type="file"  {...register("product_image", { required: true })} name="product_image"
                                                        id="product_image"
                                                        onChange={handleFileChange}
                                                        ref={fileInputRef}
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                                    {errors.product_image && <span className="text-red-500">Product image is required</span>}
                                                </div>
                                                {imageUrl && (
                                                    <div className="mt-4">
                                                        <img src={imageUrl} alt="Produk yang Dipilih" className="max-w-xs h-auto rounded-lg" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex">
                                                <button type="button" onClick={handleBackToForm} className="text-white flex  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Kembali</button>
                                                <button type="button" onClick={handleUpdate} className="text-white flex ml-auto bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Update</button>
                                            </div>

                                        </div>
                                    )}
                                </form>
                            </div>
                        </div>
                        <div className="border p-4 border-gray-200 rounded-lg mt-5">
                            <div className="relative overflow-x-auto shadow-xl border-gray-800 sm:rounded-lg">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                Product name
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Price
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Stok
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-center">
                                                Product Image
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                <span className="sr-only">Edit</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {productData.map((product, index) => (
                                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {product.product_name}
                                                </th>
                                                <td className="px-6 py-4">
                                                    {product.price}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {product.stok}
                                                </td>
                                                <td className="px-6 py-4 flex justify-center">
                                                    <img className="w-[100px] h-[100px]" src={`http://localhost:3002/product/image/${product.product_image}`} >
                                                    </img>
                                                </td>

                                                <td className="px-6 py-4 text-right space-x-4
                                                ">
                                                    <button onClick={() => handleEdit(product.id)}>Edit</button>
                                                    <button onClick={() => handleDelete(product.id)}>delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="">
                                <div className="mt-5 flex justify-between items-center">
                                    <button
                                        onClick={handlePrevPage}
                                        disabled={currentPage === 1 || totalPages === 0}
                                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white disabled:opacity-50"
                                    >
                                        Previous
                                    </button>
                                    <div className="text-gray-500 dark:text-gray-400">
                                        Page {totalPages === 0 ? '0' : currentPage} of {totalPages}
                                    </div>
                                    <button
                                        onClick={handleNextPage}
                                        disabled={currentPage === totalPages || totalPages === 0}
                                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white disabled:opacity-50"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductManagement;
