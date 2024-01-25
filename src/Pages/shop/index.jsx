import React, { useState } from 'react'
import TotalSection from '../../UI_Design/TotalSection'
import styles from './styles.module.scss'
import products from '../../Constants/data/products'
const Shop = () => {


  const [productsData,setProductsData] = useState(products)
  return (
    <div className={styles.shop}>
      <TotalSection title={"Products"}/>
     <div className={styles.shop_header}>
       <div className={styles.filter_product}>
        <select 
        name="languages"
      id="language-select"
      onfocus="this.size=6;"
      onblur="this.size=0;"
      onchange="this.size=1; this.blur()"
        className={styles.category_select}>
          <option>Filter By Category</option>
          <option value="mobile">Phones</option>
          <option value="micraphones">Micraphones</option>
          <option value="mouse">Mouses</option>
          <option value="guitars">Guitars</option>
          <option value="wireless">Wireless</option>
        </select>
        <select className={styles.category_select}>
          <option>Sort By</option>
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
           
        </select>
      </div>
      <div className={styles.search_product}>
        
         <input type="text" placeholder='Search....' className={styles.search_input} />
      </div>
     </div>
    </div>
  )
}

export default Shop