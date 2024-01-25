import React from 'react';
import {Footer, Navbar} from './Components/index';
import { Route, Routes } from 'react-router-dom';
import {Admin, Cart, Contact, Home, OrderHistory,Login,Register, Reset, Shop} from './Pages/index';
 import { ToastContainer, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/orderhistory' element={<OrderHistory/>}/>
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
// import "./styles.css";
// import { motion } from "framer-motion";

// function App() {
//   const text = "Framer".split(" ");

//   return (
//     <div className="App">
//       {text.map((el, i) => (
//         <motion.span
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{
//             duration: 2,
//             delay: i / 18
//           }}
//           key={i}
//         >
//           {el}{" "}
//         </motion.span>
//       ))}
//     </div>
//   );
// }

// export default App;

