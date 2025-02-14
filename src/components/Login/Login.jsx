import React, { useContext, useState } from 'react'
import style from "./Login.module.css"
import { useFormik } from 'formik'
import * as yup from "yup"
import axios from 'axios'
import { data, Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../Context/UserContext'


export default function Login() {
let {UserLogin,setUserLogin} = useContext(UserContext)

  const [ApiError, setApiError] = useState("")
  const [isLoading, setisLoading] = useState(false)
  let navigate = useNavigate();

  async function handleLogin (values){
    setisLoading(true)
        let res = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,values)
        .then((res)=>{
          setisLoading(false)
            if(res.data.message == "success"){
                  localStorage.setItem("userToken",res.data.token)
                  setUserLogin(res.data.token)
                  navigate("/")
            }
            
        })

        .catch((res)=>{
          setisLoading(false)
          
          setApiError(res.response.data.message)
          
        })
          

          
  }

let myValidation = yup.object().shape({
  
    email:yup.string().email("not valid email").required("email is required"),
    password:yup.string().required("password is required").min(6,"password min length is 6 "),
    
})

let formik = useFormik({

  initialValues:{
    email:"",
    password:"",
  },
  validationSchema:myValidation,
  onSubmit :handleLogin, 
})



  return <>



<form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
  
<h1 className='my-10  font-bold sm:text-lg md:text-xl lg:text-2xl xl:text-4xl ' >
  login now
  </h1>



  <div className="relative z-0 w-full mb-5 group my-10">

      <input type="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}  id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />

      <label htmlFor="email" 
      className=" left-0 peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-9 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">Email address</label>


{formik.errors.email&&formik.touched.email?(
  <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
  <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
  </svg>
  <span className="sr-only">Info</span>
  <div>
    <span className="font-medium">{formik.errors.email}</span> 
  </div>
</div>
):null}
  </div>



  <div className="relative z-0 w-full mb-5 group my-8">
      <input type="password" name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}  id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />

      <label htmlFor="password" 
      className=" left-0 peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-9 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">Enter Your Password</label>

{formik.errors.password&&formik.touched.password?(
  <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
  <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
  </svg>
  <span className="sr-only">Info</span>
  <div>
    <span className="font-medium">{formik.errors.password}</span> 
  </div>
</div>
):null}
  </div>



  


 


<div className='flex gap-4 items-center flex-col'>
<button type="submit" 
  className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center  ">{isLoading?<i className='fas fa-spinner fa-spin'></i>:"Login"}</button>

  <Link to="/register"  ><span className='text-blue-500 underline'> Do you have an account? Register Now</span></Link>
  <Link to={'/passwordProcess'} className='text-blue-500 underline '>Forget your password?</Link>
</div>

 



  </form>



  {ApiError?<div className='w-1/2 mx-auto bg-red-600 text-white font-bold rounded-lg p-3 my-5'>
   {ApiError}
   </div>:null}
  </>
  
  
  
  
}
