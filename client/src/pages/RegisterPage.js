import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import uploadFile from '../helpers/uploadFile';
import axios from 'axios'
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const [data,setData] = useState({
    name : "",
    email : "",
    password : "",
    profile_pic : ""
  })
  const [uploadPhoto,setUploadPhoto] = useState("")
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

  const handleUploadPhoto = async(e)=>{
    const file = e.target.files[0]

    const uploadPhoto = await uploadFile(file)

    setUploadPhoto(file)

    setData((preve)=>{
      return{
        ...preve,
        profile_pic : uploadPhoto?.url
      }
    })
  }
  const handleClearUploadPhoto = (e)=>{
    e.stopPropagation()
    e.preventDefault()
    setUploadPhoto(null)
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    e.stopPropagation()

    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/register`

    try {
        const response = await axios.post(URL,data)
        console.log("response",response)

        toast.success(response.data.message)

        if(response.data.success){
            setData({
              name : "",
              email : "",
              password : "",
              profile_pic : ""
            })

            navigate('/email')

        }
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
    console.log('data',data)
  }


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
    <div className="bg-white w-full max-w-md rounded-2xl shadow-lg overflow-hidden p-6 mx-auto">
      <h3 className="text-2xl font-bold text-center text-gray-800">Welcome to Chat App!</h3>
  
      <form className="grid gap-5 mt-5" onSubmit={handleSubmit}>
        {/* Name Field */}
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-gray-700 font-medium">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            className="bg-gray-50 border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            value={data.name}
            onChange={handleOnChange}
            required
          />
        </div>
  
        {/* Email Field */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-gray-700 font-medium">
            Email:
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
  
        {/* Password Field */}
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-gray-700 font-medium">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            className="bg-gray-50 border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            value={data.password}
            onChange={handleOnChange}
            required
          />
        </div>
  
        {/* Profile Photo Upload */}
        <div className="flex flex-col gap-2">
          <label htmlFor="profile_pic" className="text-gray-700 font-medium">
            Profile Photo:
          </label>
          <div
            className="h-14 bg-gray-100 flex justify-between items-center px-3 border border-gray-300 rounded-lg hover:border-green-500 cursor-pointer"
            onClick={() => document.getElementById("profile_pic").click()}
          >
            <p className="text-sm text-gray-600 truncate w-full">
              {uploadPhoto?.name ? uploadPhoto.name : "Upload profile photo"}
            </p>
            {uploadPhoto?.name && (
              <button className="text-lg text-red-500 hover:text-red-700" onClick={handleClearUploadPhoto}>
                <IoClose />
              </button>
            )}
          </div>
          <input
            type="file"
            id="profile_pic"
            name="profile_pic"
            className="hidden"
            onChange={handleUploadPhoto}
          />
        </div>
  
        {/* Register Button */}
        <button className="bg-green-500 text-lg px-5 py-2 rounded-lg font-semibold text-white shadow-md transition-all hover:bg-green-600 hover:shadow-lg">
          Register
        </button>
      </form>
  
      {/* Login Link */}
      <p className="mt-4 text-center text-gray-600">
        Already have an account?{" "}
        <Link to="/email" className="text-green-600 font-semibold hover:underline">
          Login
        </Link>
      </p>
    </div>
  </div>
  
  )
}

export default RegisterPage
