import React, { useState } from 'react'
import TotalSection from '../../UI_Design/TotalSection'
import styles from './styles.module.scss'
import products from '../../Constants/data/products'
import { MdOutlineSearch } from "react-icons/md";
import { ProductList } from '../../UI_Design';
import { useNavigate } from 'react-router-dom';

const Shop = () => {
  const [productsData,setProductsData] = useState(products)
const navigate = useNavigate()
  const handleFilter = (e)=>{
    const filterValue = e.target.value;
    if(filterValue==='micraphone'){
      const filteredProducts = products.filter(
        (item)=>item.category === 'micraphone'
      )
      setProductsData(filteredProducts)
    }
    if(filterValue==='mobile'){
      const filteredProducts = products.filter(
        (item)=>item.category === 'mobile'
      )
      setProductsData(filteredProducts)
    }
    if(filterValue==='mouse'){
      const filteredProducts = products.filter(
        (item)=>item.category === 'mouse'
      )
      setProductsData(filteredProducts)
    }
    if(filterValue==='wireless'){
      const filteredProducts = products.filter(
        (item)=>item.category === 'wireless'
      )
      setProductsData(filteredProducts)
    }
    if(filterValue==='watch'){
      const filteredProducts = products.filter(
        (item)=>item.category === 'watch'
      )
      setProductsData(filteredProducts)
    }
    if(filterValue==='guitar'){
      const filteredProducts = products.filter(
        (item)=>item.category === 'guitar'
      )
      setProductsData(filteredProducts)
    }
    if(filterValue==='wireless'){
      const filteredProducts = products.filter(
        (item)=>item.category === 'wireless'
      )
      setProductsData(filteredProducts)
    }
  }  
  const handSearch = (e)=>{
    const searchTerm = e.target.value;
    const searchedProducts = products.filter(item => item.productName.toLowerCase().includes(searchTerm.toLowerCase()))
    setProductsData(searchedProducts)
  } 
 
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
      onChange={handleFilter}
        className={styles.category_select}>
          <option>Filter By Category</option>
          <option value="mobile">Phones</option>
          <option value="micraphone">Micraphones</option>
          <option value="mouse">Mouses</option>
          <option value="guitar">Guitars</option>
          <option value="wireless">Wireless</option>
          <option value="watch">Watch</option>
        </select>
        <select className={styles.category_select}>
          <option>Sort By</option>
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
           
        </select>
      </div>
      <div className={styles.search_product}>
        <MdOutlineSearch size={22} className={styles.search_icon}/>
         <input type="text" placeholder='Search....' className={styles.search_input} 
         onChange={handSearch}
         />
      </div>
     </div>
     <div>
      {
        productsData.length===0 ? <h1>No products are found!</h1>
        :
        <ProductList data={productsData}/>
      }
     </div>
    </div>
  )
}

export default Shop