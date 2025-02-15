import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import { UserContext } from '../Context/UserContext'
import { Link } from 'react-router-dom'
import { CartContext } from '../Context/CartContext'


export default function Checkout() {

let{Checkout,cartId}=useContext(CartContext)
let formik = useFormik({

    initialValues:{
      details:"",
      phone:"",
      city:"",
    },
    
    onSubmit : ()=>handleCheckout(cartId,`https://final-project-test-xrgk.vercel.app`), 
  })
  

async function handleCheckout (cardId,url){
   let {data}= await Checkout(cardId,url,formik.values);
        window.location.href = data.session.url
   
}






  return <>

<form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
  
<h1 className='my-10  font-bold sm:text-lg md:text-xl lg:text-2xl xl:text-4xl  text-center text-emerald-600 ' >
  Checkout Now
  </h1>



  <div className="relative z-0 w-full mb-5 group my-10">

      <input type="text" name="details" value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur}  id="details" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />

      <label htmlFor="details" 
      className=" left-0 peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-9 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">Enter Your details</label>

  </div>



  <div className="relative z-0 w-full mb-5 group my-8">
      <input type="tel" name="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur}  id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />

      <label htmlFor="phone" 
      className=" left-0 peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-9 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">Enter Your Phone</label>

  </div>


  <div className="relative z-0 w-full mb-5 group my-8">
      <input type="text" name="city" value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur}  id="city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />

      <label htmlFor="city" 
      className=" left-0 peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-9 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">Enter Your City</label>

  </div>



  


 


<div className='flex gap-4 items-center flex-col'>
<button type="submit" 
  className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center  ">Checkout</button>

</div>

 



  </form>

  </>
  
  
  
  
}
