import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import styles from './styles.module.scss'

import { FiHeart } from "react-icons/fi";
import { BsPlusLg } from "react-icons/bs";
import { BsCartPlus } from "react-icons/bs";
import { TfiCommentAlt } from "react-icons/tfi";

import { formatCurrency } from '../../Constants/utils/moneyCurrent'
import { useDispatch, useSelector } from 'react-redux';

// ------------ React Icons-------------//
import { LuPlus } from "react-icons/lu";
import thumb from '../../assets/thumb.png'
import fillThumb from '../../assets/fillThumb.png'
// Redux
import { cartActions } from '../../Redux/slice/cartSlice';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import useGetData from '../../Custom Hooks/UseGetData';
import CardLoader from '../../Constants/LoaderCard';
import { auth, db } from '../../Firebase/config';
import { Timestamp, addDoc, collection, doc,onSnapshot, arrayUnion, setDoc, updateDoc, query, getDocs, orderBy, } from 'firebase/firestore';
import { FaHeart } from 'react-icons/fa';
// import    from '@mui/material/Modal';
import { Box, Typography,Modal } from '@mui/material';
import { CgClose } from 'react-icons/cg';
import UseAuth from '../../Custom Hooks/UseAuth';
const ProductCard = ({ item, index }) => {
  const {currentUser} = UseAuth()
  const { idParams } = useParams()
  const { ID, id, name, price, downloadURL, category, reviews, likeCount } = item
  const productItems = useSelector(state => state.cart.cartItems)
  const { data: products, loading } = useGetData("products")
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
    if (currentUser && likeCount !== undefined) {
      let ind = tempLikeCount.indexOf(currentUser?.displayName);
      if (ind !== -1) {
        tempLikeCount.splice(ind, 1);
        setLikesNo((unLiked) => unLiked - 1);
      } else {
        tempLikeCount.push(currentUser?.displayName);
        setLikesNo((liked) => liked + 1);
      }

      const data = {
        likeCount: tempLikeCount,
      };
      await updateDoc(docRef, data)
        .then((docRef) => {
        })
        .catch((error) => {
          toast.error(error)
        });
    }
  }
// ~~~~~~~~~~~ Read Comment ~~~~~~~~~~//
const [comments, setComments] = useState([]);


// Пример использования функции для получения комментариев для определенного продукта
 
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsQuery =await query(
          collection(db, 'products', id, 'comments'),
          orderBy('timestamp')
        );
        const commentsSnapshot = await getDocs(commentsQuery);
        const commentData =  [];

        commentsSnapshot.forEach((doc) => {
          commentData.push({ id: doc.id, ...doc.data() });
        });

        setComments(commentData)
      } catch (error) {
        console.error('Error reading comments:', error);
      }
    };

    fetchComments();
  }, [idParams, db,comments]);


  
const postComment = async () => {
  try {
    
   await  addDoc(collection(db, "products", id, "comments"), {
      userName:currentUser.displayName,
      imgUrl:currentUser.photoURL,
      text: commentText,
      timestamp: Timestamp.fromDate(new Date()),
      // timestamp: new Date(),
    });
    } catch (error) {
      console.log('Error adding comment:');
      }
      setCommentText("")
    }
  

 


  console.log(comments);


  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
   width: {
        xs: '90%', 
        sm: '50%',  
      },
  maxHeight:'60vh',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius:'5px',
  pb:2,
  px: 4,
};
  return (
    <>
      {
        (loading && !window.navigator.onLine) ? <CardLoader /> :
          (
            <div className={styles.product_item}>
              <button
               className={styles.like_btn}>

               <div>
                 {
                  likeCount.indexOf(currentUser?.displayName) != -1 ? (
                    <motion.button  onClick={() => likesHandler(id)}> <motion.img whileHover={{ scale: 1.1 }} src={fillThumb} width='25px'  alt="" /> {likesNo} </motion.button>
                  )
                    :
                    (currentUser ? <motion.button whileHover={{ scale: 1.1 }}   onClick={() => likesHandler(id)}><img src={thumb}  width='25px' alt="" /> {likesNo}</motion.button>: <p>Likes {likesNo}</p>)

                }
                <motion.button whileHover={{ scale: 1.1 }}   onClick={handleOpen}>
                  <TfiCommentAlt  className={styles.comment_btn} size={20}/>
                </motion.button>
                <button whileHover={{ scale: 1.1 }}   onClick={() => likesHandler(id)}>
                  {comments.length}
                </button>

               </div>
              </button>


              <div className={styles.product_img}>
                <a href="#shop_detail">
                  
                  <motion.img onClick={() => toDetails(ID)} whileHover={{ scale: 0.8 }} src={downloadURL} alt="" />

                </a>
              </div>
               
              <div className={styles.name_price}>
                <h3>{name}</h3>
               
                {/* <span>{likesNo} likes</span> */}
            
              </div>
        <div>
                <span className={styles.category}>{category}</span>
                <div>
                  
                </div>
        </div>
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
               
<Modal
        keepMounted
        open={open}
        onClose={handleClose}
        sx={{width:'100%',justifyContent:'center',alignItems:'center'}}
      >
        <Box sx={style}>
          <div className={styles.close_modal}>
            <button><CgClose/></button>
          </div>
           
          {
                 comments.map((item,inx)=>(
                    <div key={inx}>
                     <h1>{item.text}</h1>
                     <h1>{item.userName}</h1>
                    </div>
                  ))
                }
                <div>
              <input
              value={commentText}
              onChange={(e)=>setCommentText(e.target.value)}
              type="text" />
            </div>
            <button onClick={()=>postComment(id)}>Add Comment</button>
        </Box>
        
      </Modal>
            </div>
          )
      }
      
     
      
    </>
  )
}

export default ProductCard






 