import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CardLikeContext = createContext();

export default function CardLikeContextProvider(props) {
    const [wishlistCount, setWishlistCount] = useState(0);

    async function addProductToLike(productId) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, { productId }, {
            headers: { token: localStorage.getItem("userToken") }
        })
        .then(res => {
            fetchWishlistCount(); // ✅ تحديث العداد عند إضافة منتج
            return res;
        })
        .catch(err => err);
    }

    async function getLoggedUserWishlist() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
            headers: { token: localStorage.getItem("userToken") }
        })
        .then(res => {
            setWishlistCount(res.data.data.length); // ✅ تحديث عدد المنتجات
            return res;
        })
        .catch(err => err);
    }

    async function removeProductFromLike(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
            headers: { token: localStorage.getItem("userToken") }
        })
        .then(res => {
            fetchWishlistCount(); // ✅ تحديث العداد عند إزالة منتج
            return res;
        })
        .catch(err => err);
    }

    async function fetchWishlistCount() {
        try {
            const response = await getLoggedUserWishlist();
            if (response.data.status === "success") {
                setWishlistCount(response.data.data.length);
            }
        } catch (error) {
            console.error("Error fetching wishlist count:", error);
        }
    }

    useEffect(() => {
        fetchWishlistCount();
    }, []);

    return (
        <CardLikeContext.Provider value={{ addProductToLike, getLoggedUserWishlist, removeProductFromLike, wishlistCount }}>
            {props.children}
        </CardLikeContext.Provider>
    );
}
