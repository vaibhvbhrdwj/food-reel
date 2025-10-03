import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UserRegister = () => {

    const  navigate = useNavigate();

    const handleSubmit = async (e) =>{
        
        e.preventDefault();

        const firstName = e.target.firstName.value;
        const lastName = e.target.lastName.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        const response = await axios.post("http://localhost:3000/api/auth/user/register",{
            fullName : firstName+" "+lastName,
            email,
            password
        },
        {
            withCredentials: true
        }
    )

    console.log(response.data);

    navigate("/")
    }
  return (
<div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="w-full max-w-lg bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 p-8 sm:p-12">
        {/* Profile Image */}
        <div className="flex justify-center mb-8">
          <img
            className="h-28 w-28 rounded-full border-4 border-white/25 shadow-lg object-cover"
            src="../src/assets/images/vecteezy_default-profile-picture-avatar-user-avatar-icon-person_21548095.jpg"
            alt="Profile"
          />
        </div>
        
        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-white text-4xl font-bold tracking-tight">Register as User</h1>
          <p className="text-white/80 text-base mt-2">Fill in your details to get started</p>
        </div>
        
        {/* Form */}
        <form className="space-y-6">
          {/* First and Last Name in a single row for a cleaner look on larger screens */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="block text-white/90 text-sm font-medium mb-1.5">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                placeholder="Enter your first name"
                className="w-full px-4 py-3 rounded-lg border border-white/30 bg-white/15 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>
            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className="block text-white/90 text-sm font-medium mb-1.5">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                placeholder="Enter your last name"
                className="w-full px-4 py-3 rounded-lg border border-white/30 bg-white/15 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>
          </div>
          
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-white/90 text-sm font-medium mb-1.5">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg border border-white/30 bg-white/15 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
          
          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-white/90 text-sm font-medium mb-1.5">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-lg border border-white/30 bg-white/15 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
          
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 mt-8 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold tracking-wide shadow-xl transition-colors duration-200"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default UserRegister