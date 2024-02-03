import React, { useState } from 'react'
import { GoPlus } from 'react-icons/go'
import { HiMinus } from 'react-icons/hi'
import { MdOutlineDelete } from 'react-icons/md'
import styles  from '../../Pages/cart/styles.module.scss'
import { useDispatch } from 'react-redux'
import { cartActions } from '../../Redux/slice/cartSlice'
import { RiDeleteBin5Line } from 'react-icons/ri'
const CartItem = ({item,number}) => {
  console.log(item)
    const dispatch = useDispatch()
    const DeleteProduct = ()=>{
         const action = window.confirm('Do you want delete?')
        if(action){
          dispatch(cartActions.deleteProduct(item.id))
        }
      
    }

    const handleIncrement = ()=>{
    dispatch(cartActions.incrementQuantity(item.id))
    }
    const handleDecrement = ()=>{
    dispatch(cartActions.decrementQuantity(item.id))
    }
   
       
  return (
     <tr>
            <td>
              <p>{number+1} </p>
            </td>
            <td>
              <img src={item.image} alt="" />
            </td>
            <td>{item.productName}</td>
            <td>{item.price}</td>
            <td>
              <div className={styles.plus_minus_btn}>
                <button><GoPlus onClick={handleIncrement} className={styles.plus_icon} size={22}/></button>
                <span>{item.quantity}</span>
                <button><HiMinus onClick={handleDecrement} className={styles.minus_icon}  size={22}/></button>
              </div>
            </td>
            <td>{item.totalPrice}</td>
            <td>
                          <div onClick={DeleteProduct} className={styles.delete}>
                            <button type="button" className={styles.delete_btn}>
                            <span className={styles.btn_text}>Delete</span>
                            <span className={styles.btn_icon}>
                              <RiDeleteBin5Line size={18} />
                                  </span>
                          </button>
                          </div>

                        </td>
          </tr>
  )
}

export default CartItem