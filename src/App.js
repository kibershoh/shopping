import React from 'react';
import {Header,Footer} from './Components/index';
import { Route, Routes } from 'react-router-dom';
import {Admin, Cart, Contact, Home, OrderHistory} from './Pages/index';

{/* <Navbar/> */}
  //  <Slider/>
function App() {
  return (
    <>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/orderhistory' element={<OrderHistory/>}/>
      <Route path='/admin' element={<Admin/>}/>
    </Routes>
    <Footer/>
    </>
  );
}

export default App;
