import React, { useState } from 'react'
import { motion } from 'framer-motion'

import styles from './styles.module.scss'

import { FiHeart } from "react-icons/fi";
import { BsPlusLg } from "react-icons/bs";
import { BsCartPlus } from "react-icons/bs";

import { formatCurrency } from '../../Constants/utils/moneyCurrent'
import { useDispatch, useSelector } from 'react-redux';

// ------------ React Icons-------------//
import { LuPlus } from "react-icons/lu";
// Redux
import { cartActions } from '../../Redux/slice/cartSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ item }) => {
  const productItems = useSelector(state => state.cart.cartItems)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [added, setAdded] = useState(false)
  const active = ()=>{
    if(item.action){
      setAdded(false)
    }
    else{
      setAdded(true)
    }
  }
  const addToCart = () => {
    dispatch(
      cartActions.addProduct({
        id: item.id,
        productName: item.productName,
        price: item.price,
        image: item.imgUrl,
        action: item.action,     
      })
    ) 
    active() 
     
    
  }

  const toDetails = (id) => {
    navigate('/shop/' + id)
  }

  return (
    <div className={styles.product_item}>
      <motion.button whileHover={{ scale: 1.1 }} className={styles.like_btn}>
        <FiHeart size={25} />
      </motion.button>

      <div className={styles.product_img}>
        <a href="#shop_detail">
          <motion.img onClick={() => toDetails(item.id)} whileHover={{ scale: 0.8 }} src={item.imgUrl} alt="" />

        </a>
      </div>
      <div className={styles.name_price}>
        <h3>{item.productName}</h3>


      </div>
      <span className={styles.category}>{item.category}</span>
      <div className={styles.product_add}>
        <motion.button onClick={addToCart} whileHover={{ scale: 1.09 }} className={styles.product_btn}>
          <div className={styles.button_wrapper}>
           
            <div className={styles.text}>
              
              {
                added ? 'Added' : 'Buy Now'
              }
            </div>
            <span className={styles.icon}>
              {
                added ? 'Added' : <BsCartPlus />
              }
            </span>
          </div></motion.button>
        <span>{formatCurrency(item.price)}</span>

      </div>
    </div>
  )
}

export default ProductCard