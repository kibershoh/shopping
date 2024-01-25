import React from 'react'
import styles from './styles.module.scss'
import ProductCard from '../ProductCard'
const ProductList = ({data}) => {
  return (
    <div className={styles.product_list}>
        {
         data?.map((item,index)=>(
            <ProductCard item={item} key={index}/>
         ))
        }
    </div>
  )
}

export default ProductList