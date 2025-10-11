import React, { useState } from 'react'

const FoodPartnerRegister = () => {


  const [data , setData] = useState({
    firstName : '',
    LastName : '',
    email : "",
    password : ""
  })

  const [errors , setErrors]= useState();
  const [touch , setTouch] = useState();
  const [showPassword , setShowPassword] = useState();

  return (
    <div>FoodPartnerRegister</div>
  )
}

export default FoodPartnerRegister

//trying my best to make it more interactive and feature loaded 
