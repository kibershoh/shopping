import React, { useState } from 'react';
import {Footer, Navbar} from './Components/index';
import { Route, Routes } from 'react-router-dom';
import {Admin, Cart, Contact, Home, OrderHistory,Login,Register, Reset, Shop, Checkout} from './Pages/index';
 import { ToastContainer, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductDetails from './Pages/productDetails';
import ProtectedRoute from './ProtectedRoute';
function App() {   
 
  return (
    <>
    <ToastContainer
     autoClose={500}
     theme='dark'
     closeOnClick
     pauseOnHover={false}
     />
    <Navbar/>    
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/shop' element={<Shop/>}/>
      <Route path='/shop/:id' element={<ProductDetails/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/checkout' element={<ProtectedRoute>
        <Checkout/>
      </ProtectedRoute>}/>
      <Route path='/admin' element={<Admin/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/reset' element={<Reset/>}/>
    </Routes>
    <Footer/>

    </>
  );
}

export default App;
