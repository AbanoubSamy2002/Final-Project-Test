import axios from "axios";
import { createContext, useEffect, useState } from "react";






export let CartContext = createContext();


export default function   CartContextProvider(props){
const [cartId, setcartId] = useState(0)
    const [numberItems, setnumberItems] = useState(0)

    function addProductToCard(productId){
           return axios
           .post(`https://ecommerce.routemisr.com/api/v1/cart`, { productId }, { headers: { token: localStorage.getItem("userToken") } })
            .then((res)=>res)
            .catch((err)=>err)
            
            
    }


            function updateCartProductQuantity(productId,newCount){
                return axios
                .put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{count:newCount},{ headers: { token: localStorage.getItem("userToken") } })
                .then((res)=>res)
                .catch((err)=>err)
            }
            function getLoggedUserCard(){
                return axios
                .get(`https://ecommerce.routemisr.com/api/v1/cart`,{ headers: { token: localStorage.getItem("userToken") } })
                .then((res)=>{
                    setnumberItems(res.data.numOfCartItems)
                    setcartId(res.data.data._id)
                    return res
                    
                })
                .catch((err)=>err)
            }

            function Checkout(cardId,url,formData){
                return axios
                .post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cardId}?url=${url}`,{
                    shippingAddress:formData
                },{ headers: { token: localStorage.getItem("userToken") } })
                .then((res)=>res)
                .catch((err)=>err)
            }
            function deleteCardItem(productId){
                return axios
                .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{ headers: { token: localStorage.getItem("userToken") } })
                .then((res)=>res)
                .catch((err)=>err)
            }
useEffect(()=>{
    getLoggedUserCard()
},[])

    return<CartContext.Provider value={{deleteCardItem,addProductToCard,getLoggedUserCard,updateCartProductQuantity,setnumberItems,numberItems,Checkout,cartId}}>
    {props.children}
</CartContext.Provider>
}