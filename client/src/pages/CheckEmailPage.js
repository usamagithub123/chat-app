import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import uploadFile from '../helpers/uploadFile';
import axios from 'axios'
import toast from 'react-hot-toast';
import { PiUserCircle } from "react-icons/pi";

const CheckEmailPage = () => {
  const [data,setData] = useState({
    email : "",
  })
  const navigate = useNavigate()

  const handleOnChange = (e)=>{
    const { name, value} = e.target

    setData((preve)=>{
      return{
          ...preve,
          [name] : value
      }
    })
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    e.stopPropagation()

    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/email`

    try {
        const response = await axios.post(URL,data)

        toast.success(response.data.message)

        if(response.data.success){
            setData({
              email : "",
            })
            navigate('/password',{
              state : response?.data?.data
            })
        }
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
  }


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
    <div className="bg-white w-full max-w-md rounded-2xl shadow-lg overflow-hidden p-6 mx-auto">
      <div className="w-fit mx-auto mb-4">
        <PiUserCircle size={90} className="text-gray-600" />
      </div>
  
      <h3 className="text-2xl font-bold text-center text-gray-800">
        Welcome to Chat App!
      </h3>
  
      <form className="grid gap-5 mt-5" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-gray-700 font-medium">
            Email :
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            className="bg-gray-50 border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            value={data.email}
            onChange={handleOnChange}
            required
          />
        </div>
  
        <button
          className="bg-green-500 text-lg px-5 py-2 rounded-lg font-semibold text-white shadow-md transition-all hover:bg-green-600 hover:shadow-lg"
        >
          Let's Go
        </button>
      </form>
  
      <p className="mt-4 text-center text-gray-600">
        New User?{" "}
        <Link to="/register" className="text-green-600 font-semibold hover:underline">
          Register
        </Link>
      </p>
    </div>
  </div>
  
  )
}

export default CheckEmailPage
