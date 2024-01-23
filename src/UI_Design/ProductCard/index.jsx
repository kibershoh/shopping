import React from 'react'
import { motion } from 'framer-motion'

import styles from './styles.module.scss'

import { FiHeart } from "react-icons/fi";
import { BsPlusLg } from "react-icons/bs";

import { formatCurrency } from '../../Constants/utils/moneyCurrent'
const ProductCard = ({ item }) => {
  return (
    <div className={styles.product_item}>
      <motion.button whileHover={{ scale: 1.1 }} className={styles.like_btn}>
        <FiHeart size={25} />
      </motion.button>

      <div className={styles.product_img}>
        <motion.img whileHover={{ scale: 0.8 }} src={item.imgUrl} alt="" />
      </div>
      <div className={styles.name_price}>
        <h3>{item.productName}</h3>


      </div>
      <span className={styles.category}>{item.category}</span>
      <div className={styles.product_btn}>
        <motion.button whileHover={{ scale: 1.09 }} className={styles.add_btn}>
          Add <BsPlusLg className={styles.plus_icon} size={22} />
        </motion.button>
        <span>{formatCurrency(item.price)}</span>

      </div>
    </div>
  )
}

export default ProductCard