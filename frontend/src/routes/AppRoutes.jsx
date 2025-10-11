import React from 'react'
import { BrowserRouter as Router , Route , Routes, BrowserRouter } from 'react-router-dom'
import UserRegister from '../pages/auth/UserRegister'
import axios from 'axios'

const AppRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/user/register" element={<UserRegister />} />
            <Route path="/user/login" element={<h1>User Login</h1>}/>
            <Route path="/food-partner/register" element={<h1>Food-PartnerRegister</h1>}/>
            <Route path="/food-partner/login" element ={<h1>FoodPartner Login</h1>}/>
        </Routes>
    </BrowserRouter>
  )
}
 
export default AppRoutes