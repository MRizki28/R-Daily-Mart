import axios from "axios";


export async function getDataCart(setCartData: Function) {
    try {
        const response = await axios.get('http://localhost:3002/cart');
        const responseData = response.data.data;
        setCartData(responseData);
    } catch (error) {
        console.log(error);
    }
}