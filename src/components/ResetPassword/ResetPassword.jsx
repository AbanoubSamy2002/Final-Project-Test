import React, { useState } from 'react'
import * as yup from "yup"
import { useFormik } from 'formik'

import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function ResetPassword() {
  const [loading, setLoading] = useState(false)
  let navigate = useNavigate()
  async function resetPassword(values) {
    try{
      setLoading(true)
      let {data}= await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword` , values)
    console.log(data);
    navigate('/login')
    setLoading(false)
  }catch(err){
    console.log(err);
    toast.error("This Email not found" , 
      {
        duration: 4000,
        position:'top-center'
      })
    setLoading(false)
    }}

  let validationSchema = yup.object().shape(
    {
      email: yup.string().email('invalid mail').required('email is required'),
      newPassword: yup.string().matches(/^[A-Z]\w{5,20}$/, 'password must be starts with capital letters').required('password is required'),
    }
  )

  let formik = useFormik(
    {
      initialValues: {
        email: '',
        newPassword: '',
      }, validationSchema,
      onSubmit: resetPassword
    }
  )

    
  return <>
    
    <div className='max-sm:w-11/12 sm:w-11/12 md:w-9/12  lg:w-[50%] mx-auto mt-28'>
    <form className="" onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="email" >email:</label>
        <input type="email" name="email" value={formik.values.email} id="email" onBlur={formik.handleBlur} onChange={formik.handleChange} className='mt-1 mb-2 w-full p-2.5 border border-gray-400 rounded-md focus:border-green-500 focus:outline-none focus:ring-0 text-sm'/>
      </div>
      {formik.errors.email && formik.touched.email && <div className="p-4 mb-4 text-sm text-red-700 rounded-lg bg-red-50 " role="alert">
        {formik.errors.email}
      </div>}
      <div>
        <label htmlFor="newPassword" >newPassword:</label>
        <input type="password" name="newPassword" value={formik.values.newPassword} id="newPassword" onBlur={formik.handleBlur} onChange={formik.handleChange} className='mt-1 mb-2 w-full p-2.5 border border-gray-400 rounded-md focus:border-green-500 focus:outline-none focus:ring-0 text-sm'/>
      </div>
      {formik.errors.newPassword && formik.touched.newPassword && <div className="p-4 mb-4 text-sm text-red-700 rounded-lg bg-red-50 " role="alert">
        {formik.errors.newPassword}
      </div>}
        {loading ? <div className="w-full flex justify-end"> <button type="button" className="text-white bg-[#0aad0a] mt-5 font-medium rounded-md text-lg px-10 pt-1.5 pb-2 text-center flex justify-center items-center">
            <div className="absolute inset-0 bg-white bg-opacity-90 z-40 flex items-center justify-center rounded-xl">
            <div className="loader animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
          </div> </button> </div>:  <div className="w-full flex justify-end"> <button type="submit" className="text-white mt-5 bg-[#0aad0a] focus:outline-none font-medium text-[17px] rounded-md px-7 py-2 text-center">Reset Password</button> </div>}
        
    </form>
    </div>
  
  </>
}
