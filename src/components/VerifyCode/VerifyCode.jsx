import React, { useState } from 'react'
import axios from 'axios'
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router-dom';


export default function VerifyCode() {
  let navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [Input, setInput] = useState(false)

  const handleInput = (event)=>{
    setInput(event.target.value);
  }

async function verifyCodeUser() {
  try{
    setLoading(true)
    let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode` , {
      "resetCode" : Input
    })
    console.log(data);
    toast.success(data.status , 
      {
        duration: 4000,
        position:'top-center'
      }
    )
    navigate('/passwordProcess/resetPassword')
    setLoading(false)
  }catch(err){
    console.log(err);
    toast.error("Code not valid" , 
      {
        duration: 4000,
        position:'top-center'
      }
    )
    setLoading(false)
  }
}

let formik = useFormik(
  {
    initialValues: {
      "resetCode"  : '',
    },
    onSubmit: verifyCodeUser
  }
)
  return  <>
    
  <div className='max-sm:w-11/12 sm:w-11/12 md:w-9/12  lg:w-[50%] mx-auto mt-28'>
  <form onSubmit={formik.handleSubmit}>
    <div>
      <label htmlFor="resetCode" >code:</label>
      <input type="number" name="resetCode" onInput={handleInput} value={formik.values.number} id="resetCode" onBlur={formik.handleBlur} onChange={formik.handleChange} className='mt-1 mb-2 w-full p-2.5 border border-gray-400 rounded-md focus:border-green-500 focus:outline-none focus:ring-0 text-sm'/>
    </div>
      {loading ? <div className="w-full flex justify-end"> <button type="button" className="text-white bg-[#0aad0a] mt-5 font-medium rounded-md text-lg px-10 pt-1.5 pb-2 text-center flex justify-center items-center">
        <div className="absolute inset-0 bg-white bg-opacity-90 z-40 flex items-center justify-center rounded-xl">
            <div className="loader animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
          </div> </button> </div>:  <div className="w-full flex justify-end"> <button type="submit" className="text-white mt-5 bg-[#0aad0a] focus:outline-none font-medium text-[17px] rounded-md px-7 py-2 text-center">Verify</button> </div>}
  </form>
  </div>
</>
}
