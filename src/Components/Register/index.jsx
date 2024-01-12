import React, { useState } from 'react'
import axios from 'axios';
import Input from '../../ui/input';

const Register = () => {
  const [name,setName] = useState('')
  const [password,setPassword] = useState('')
  const [email,setEmail] = useState('')


  // Redux information
   
  return (
 <div className='w-full flex justify-center items-center h-screen'>
   <form className="w-1/3 max-md:w-8/12 mx-auto">
  <Input 
  name={"Username"}
  state={name}
  setState={setName}
  type={'text'}
  />
  <Input 
  name={"Your email"}
  state={email}
  setState={setEmail}
  type={'email'}
  />
  <Input 
  name={"Password"}
  state={password}
  setState={setPassword}
  type={'password'}
  />

  
   

  <button  type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
Register
  </button>
</form>
 </div>


  )
}



export default Register;