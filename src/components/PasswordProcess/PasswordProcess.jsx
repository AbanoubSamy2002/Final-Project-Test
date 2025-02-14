import React, { useContext, useState } from 'react'

import { useFormik } from 'formik'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import toast from "react-hot-toast";
import * as yup from "yup"
import { UserContext } from '../Context/UserContext'



export default function PasswordProcess() {

  const [loading, setLoading] = useState(false)


let navigate = useNavigate()
async function sendCode(values) {
    try{
      setLoading(true)
      let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords` , values)
      console.log(data.message);
      toast.success(data.message , 
        {
          duration: 4000,
          position:'top-center'
        }
      )
      navigate('/passwordProcess/verifyCode')
      setLoading(false)
    }catch(err){
      console.log(err);
      toast.error("this Email is not Found" , 
        {
          duration: 4000,
          position:'top-center'
        }
      )
      setLoading(false)
    }
  }
  let validationSchema = yup.object().shape(
    {
      email: yup.string().email('invalid mail').required('email is required'),
    }
  )

  let formik = useFormik(
    {
      initialValues: {
        email: '',
      }, validationSchema,
      onSubmit: sendCode
    }
  )

    
  return <>
    
    <div className='max-sm:w-11/12 sm:w-11/12 md:w-9/12  lg:w-[50%] mx-auto mt-28'>
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="email" >email:</label>
        <input type="email" name="email" value={formik.values.email} id="email" onBlur={formik.handleBlur} onChange={formik.handleChange} className='mt-1 mb-2 w-full p-2.5 border border-gray-400 rounded-md focus:border-green-500 focus:outline-none focus:ring-0 text-sm'/>
      </div>
      {formik.errors.email && formik.touched.email && <div className="p-4 mb-4 text-sm text-red-700 rounded-lg bg-red-50 " role="alert">
        {formik.errors.email}
      </div>}
        {loading ? <div className="w-full flex justify-end"> <button type="button" className="text-white bg-[#0aad0a] mt-5 font-medium rounded-md text-lg px-10 pt-1.5 pb-2 text-center flex justify-center items-center">
            <div className="absolute inset-0 bg-white bg-opacity-90 z-40 flex items-center justify-center rounded-xl">
            <div className="loader animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
          </div> </button> </div>:  <div className="w-full flex justify-end"> <button type="submit" className="text-white mt-5 bg-[#0aad0a] focus:outline-none font-medium text-[17px] rounded-md px-7 py-2 text-center">Verify</button> </div>}
    </form>
    </div>
  </>
}
