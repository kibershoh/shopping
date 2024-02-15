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
import { useNavigate, useParams } from 'react-router-dom';
import useGetData from '../../Custom Hooks/UseGetData';
import CardLoader from '../../Constants/LoaderCard';
import { auth, db } from '../../Firebase/config';
import { async } from 'q';
import { Timestamp, addDoc, collection, doc, arrayUnion, setDoc, updateDoc } from '@firebase/firestore';
import { FaHeart } from 'react-icons/fa';

const ProductCard = ({ item, index }) => {
  let user = auth?.currentUser
  const { idParams } = useParams()
  const { ID, id, name, price, downloadURL, category, reviews, likeCount } = item
  const productItems = useSelector(state => state.cart.cartItems)
  const { data: products, loading } = useGetData("products")
  console.log(products);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [added, setAdded] = useState(false)
  const [commentText,setCommentText] = useState("")
  const active = () => {
    if (item.action) {
      setAdded(false)
    }
    else {
      setAdded(true)
    }
  }
  const addToCart = () => {
    dispatch(
      cartActions.addProduct({
        id: id,
        name: name,
        price: price,
        downloadURL: downloadURL,
      })
    )
    active()


  }
 
  const toDetails = (id) => {
    navigate('/shop/' + id)
  }
  const [likesNo, setLikesNo] = useState(likeCount ? likeCount.length : 0);
  const [isLikesOpen, setIsLikesOpen] = useState(false);
  const [likeCounts, setLikeCounts] = useState([]);
 
  const tempLikeCount = likeCount ? [...likeCount] : [];
  const docRef = doc(db, "products", id);

  async function likesHandler() {
    if (user && likeCount !== undefined) {
      let ind = tempLikeCount.indexOf(user?.displayName);
      if (ind !== -1) {
        tempLikeCount.splice(ind, 1);
        setLikesNo((unLiked) => unLiked - 1);
      } else {
        tempLikeCount.push(user?.displayName);
        setLikesNo((liked) => liked + 1);
      }

      const data = {
        likeCount: tempLikeCount,
      };
      await updateDoc(docRef, data)
        .then((docRef) => {
          toast.success("jhgvcbnm")
        })
        .catch((error) => {
          toast.error(error)
        });
    }
  }



// ~~~~~~~~~~Comment~~~~~~~~~~~~
const postComment = async () => {
  try {
    await addDoc(collection(db, 'products', id, 'comment'), {
      userName:user.displayName,
      imgUrl:user.photoURL,
      text: commentText,
      timestamp: new Date(),
    });
  } catch (error) {
    console.error('Error adding comment:', error);
  }
};
  return (
    <>
      {
        (loading && !window.navigator.onLine) ? <CardLoader /> :
          (
            <div className={styles.product_item}>
              <motion.button onClick={() => likesHandler(id)}
                whileHover={{ scale: 1.1 }} className={styles.like_btn}>

                {
                  likeCount.indexOf(user?.displayName) != -1 ? (
                    <p> <FaHeart style={{color:'red'}} size={25} /> </p>
                  )
                    :
                    (user ? <p> <FiHeart size={25} /> </p> : <p>Likes {likesNo}</p>)

                }
              </motion.button>

              <div className={styles.product_img}>
                <a href="#shop_detail">
                  
                  <motion.img onClick={() => toDetails(ID)} whileHover={{ scale: 0.8 }} src={downloadURL} alt="" />

                </a>
              </div>
               
              <div className={styles.name_price}>
                <h3>{name}</h3>

                {/* <span>{likesNo} likes</span> */}
            
              </div>
              <span className={styles.category}>{category}</span>
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
                <span>{formatCurrency(price)}</span>
            {/* <div>
              <input
              value={commentText}
              onChange={(e)=>setCommentText(e.target.value)}
              type="text" />
            </div>
            <button onClick={()=>postComment(id)}>Add Comment</button> */}
              </div>
            </div>
          )
      }
    </>
  )
}

export default ProductCard