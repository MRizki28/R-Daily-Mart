import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye } from "react-icons/fa";

interface TypeProduct {
    id: string;
    type_product: string;
}

const TypeProductManagement: React.FC = () => {
    const { register, handleSubmit: submitForm, formState: { errors }, reset } = useForm();
    const [productData, setProductData] = React.useState<TypeProduct[]>([]);
    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const [totalPages, setTotalPages] = React.useState<number>(0);
    const [getDataById, setGetDataById] = React.useState<TypeProduct | null>(null)
    const [selectedFileName, setSelectedFileName] = React.useState<string>("");

    const getAllData = async (page: number) => {
        try {
            const response = await axios.get(`http://localhost:3002/typeproduct?page=${page}`);
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
            const response = await axios.post("http://localhost:3002/typeproduct/create", {
                type_product: data.type_product
            });

            if (response.data.message === "Check your validation") {
                toast.error("Input tidak boleh kosong!");
            } else {
                toast.success("Sukses tambah produk")
                setSelectedFileName('');
            }

            console.log("Server response:", response.data);
            getAllData(currentPage);
            reset();
        } catch (error) {
            console.log("Error:", error);
        }
    };

    const getDataId = async (id: string) => {
        const response = await axios.get(`http://localhost:3002/typeproduct/get/${id}`)
        const data = response.data.data
        setGetDataById(data)
        console.log(data)
    }

    const handleEdit = async (id: string) => {
        console.log(id)
        setGetDataById(null)
        setSelectedFileName("");
        await getDataId(id)
    }

    const updateData = async ( id: string) => {
        try {
            const typeProduct = document.getElementById("type_product") as HTMLInputElement;
            const response = await axios.post(`http://localhost:3002/typeproduct/update/${id}`, {
                type_product: typeProduct.value
            });
    
            if (response.data.message === "Check your validation") {
                toast.error("Input tidak boleh kosong!");
            } else {
                toast.success("Sukses update type product");
                getAllData(currentPage);
            }
        } catch (error) {
            console.log("Error:", error);
        }
    };
    

    const handleUpdate = async () => {
        if (!getDataById) return
        await updateData(getDataById.id);;
    }

    const handleBackToForm = () => {
        window.location.reload()
    };

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
                                        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-white">Jenis Product</label>
                                        <input type="text" {...register("type_product", { required: true })} defaultValue={getDataById?.type_product} id="type_product" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Rice" />
                                        {errors.type_product && <span className="text-red-500">Jenis Product name is required</span>}
                                    </div>
                                    {getDataById === null ? (
                                        <div className="flex">
                                            <button type="submit" className="text-white flex ml-auto bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Simpan</button>
                                        </div>
                                    ) : (
                                        <div className="flex">
                                            <button type="button" onClick={handleBackToForm} className="text-white flex  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Kembali</button>
                                            <button type="button" onClick={handleUpdate} className="text-white flex ml-auto bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Update</button>
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
                                                No
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Type Product
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                <span className="sr-only">Edit</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {productData.map((typeproduct, index) => (
                                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {index + 1}
                                                </th>
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {typeproduct.type_product}
                                                </th>
                                                <td className="px-6 py-4 text-right space-x-4">
                                                    <button onClick={() => handleEdit(typeproduct.id)}>Edit</button>
                                                    <button >delete</button>
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

export default TypeProductManagement;
