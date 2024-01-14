import React from 'react';
import {Footer, Navbar} from './Components/index';
import { Route, Routes } from 'react-router-dom';
import {Admin, Cart, Contact, Home, OrderHistory} from './Pages/index';
 
function App() {
  return (
    <>
    <Navbar/>
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

