import React from 'react'
import me1 from '../../assets/me1.jpg'
import { GoPlus } from "react-icons/go";
import { HiMinus } from "react-icons/hi";
import { TbNumber } from "react-icons/tb";
import { FaArrowRightLong } from "react-icons/fa6";
import styles from './styles.module.scss'
import { cartActions } from '../../Redux/slice/cartSlice';
import { useSelector } from 'react-redux';
import CartItem from '../../UI_Design/CartItem';
import { formatCurrency } from '../../Constants/utils/moneyCurrent';
import { Link } from 'react-router-dom';
import { RiDeleteBin5Line } from 'react-icons/ri';
const Cart = () => {
  const productItems = useSelector(state => state.cart.cartItems)
  const totalAmout = useSelector(state => state.cart.totalAmout)
  return (
    <>
      <div id='cart' className={styles.cart}>
        {
          productItems.length === 0 ? (
            <h1 className={styles.no_product}>No product added to cart</h1>
          ) :
            (

              <>
                <div className={styles.overflow_table}>
                  <table>
                    <thead>
                      <tr>
                        <th><TbNumber size={19}/> </th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
          productItems.map((item,index)=>(          
            <CartItem item = {item} key={index} number= {index}/>
          ))
         }
        
                     


                    </tbody>
                  </table>
                </div>
                <div className={styles.total_price}>
                  <div className={styles.all_price}>
                    <h1>Product price</h1>
                    <span>{totalAmout} $</span>
                  </div>
                  <p>If you want to buy, you can pay by card. Payments are made safely with us.</p>
                  <div className={styles.checkout_btn}>
                    <Link to={'/checkout'}>Checkout</Link>
                    <Link to={'/shop'}>Continue Shopping <FaArrowRightLong className={styles.right_icon} /></Link>
                  </div>
                </div>
              </>
            )}
      </div>
    </>
  )
}

export default Cart