import React, { useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux';

// --------React Icons -----------//
import { IoStarSharp } from "react-icons/io5";
import { LuPlus } from 'react-icons/lu';

// --------Library-------//
import { toast } from 'react-toastify';
import { Rating } from '@mui/material';
import { motion } from 'framer-motion'
import StarIcon from '@mui/icons-material/Star';

// ----------Components----------//
import { formatCurrency } from '../../Constants/utils/moneyCurrent';
import styles from './styles.module.scss'
import ProductList from '../../UI_Design/ProductList';

// -------------Data-------------//
import products from '../../Constants/data/products'

// -----------Redux----------//
import { cartActions } from '../../Redux/slice/cartSlice';




const ProductDetails = () => {

    const { id } = useParams()

    // ----------States -----------//
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')
    const [tab, setTab] = useState('desc')
    
    
    const product = products.find(item => item.id === id)
    const { imgUrl, productName, price, avgRating, reviews, description, shortDesc, category } = product;
    const categoryData = products.filter((item) => item.category === category)
   
    const labels = {
        0.5: 'Uselkjm',
        1: 'Useless+',
        1.5: 'Poor',
        2: 'Poor+',
        2.5: 'Ok',
        3: 'Ok+',
        3.5: 'Good',
        4: 'Good+',
        4.5: 'Excellent',
        5: 'Excellent+',
    };

    // ----------Stars-----------//
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(-1);
        let text = ''   

        // -------Rewiews----------//
    const rewiewUser = useRef('')
    const reviewMsg = useRef('')
    const dispatch = useDispatch()


// -------------Functions---------//
    const submitHandler = (e) => {
        e.preventDefault()
       
     const reviewUserName = rewiewUser.current.value;
        const reviewUserMsg = reviewMsg.current.value;

        switch (rating) {
            case 0.5: text = labels['0.5']
                break;
            case 1: text=labels[1]
                break;
            case 1.5: text=labels['1.5']
                break;
            case 2: text=labels['2']
                break;
            case 2.5: text=labels['2.5']
                break;
            case 3: text=labels['3']
                break;
            case 3.5: text=labels['3.5']
                break;
            case 4: text=labels['4']
                break;
            case 4.5: text=labels['4.5']
                break;
            case 5: text=labels['5']
                break;
            default: text=' '

        }
         
        const rewiewArr = {
            userName: reviewUserName,
            text: reviewUserMsg,
            rating: rating,
            text: text,
        }
        toast.success('Reviews send!')
    }
    const addToCart = () => {
        dispatch(cartActions.addProduct({
            id: id,
            image: imgUrl,
            productName: productName,
            price: price,
        }))
    }

    return (
        <>
            <div id='shop_detail' className={styles.details}>

                <div className={styles.product_details}>
                    <div className={styles.product_detail}>
                        <div className={styles.product_img}>
                            <motion.img whileHover={{ scale: 0.8 }} src={imgUrl} alt="" />
                        </div>
                        <div className={styles.about_product}>
                            <h1>{productName}</h1>
                            <div className={styles.product_rating}>
                                <div>
                                    <span><IoStarSharp size={22} /></span>
                                    <span><IoStarSharp size={22} /></span>
                                    <span><IoStarSharp size={22} /></span>
                                    <span><IoStarSharp size={22} /></span>
                                    <span><IoStarSharp size={22} /></span>
                                </div>
                                <h3>({avgRating})</h3>
                                <h4>{formatCurrency(price)}</h4>
                            </div>
                            <p>{shortDesc}</p>
                            <div>
                                <button onClick={addToCart} className={styles.add_btn} >Add To Cart<LuPlus className={styles.plus_btn} /></button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.descriptions}>
                        <div>
                            <div className={styles.tab_btn}>
                                <button onClick={() => setTab('desc')} className={tab === 'desc' ? styles.active_tab : ''}>Description</button>
                                <button onClick={() => setTab('rewiews')} className={tab === 'rewiews' ? styles.active_tab : ''}>Reviews ({reviews.length})</button>

                            </div>
                            <div className={styles.description_rewiews}>
                                {
                                    tab === 'desc' ?
                                        <p>{description}</p>
                                        :
                                        <div>
                                            {
                                                reviews?.map((item, index) => (
                                                    <>
                                                        <span>{item.rating}</span>
                                                        <p>{item.text}</p>
                                                    </>
                                                ))
                                            }
                                        </div>
                                }
                            </div>
                        </div>
                        <div className={styles.send_message}>
                            <form onSubmit={submitHandler}>

                                <div className={styles.send_msg}>
                                    <label>Your Name</label>
                                    <input
                                        ref={rewiewUser}
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        type='text' placeholder='Enter your name'
                                        required
                                    />
                                </div>
                                <div className={styles.send_msg}>
                                    <label> Enter Message</label>
                                    <textarea
                                        ref={reviewMsg}
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        rows={5}
                                        type='text' placeholder='Message'
                                        required
                                    />
                                </div>
                                <div>
                                    <label className={styles.rate}>Rate our product</label>

                                    <div className={styles.stars}>
                                        <Rating
                                            name="hover-feedback"
                                            value={rating}
                                            precision={0.5}
                                            onChange={(event, newValue) => {
                                                setRating(newValue);
                                            }}
                                            onChangeActive={(event, newHover) => {
                                                setHover(newHover);
                                            }}
                                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}

                                        />
                                        {rating !== null && (
                                            <div className={styles.star_desc}>{labels[hover !== -1 ? hover : rating]}</div>
                                        )}
                                    </div>
                                </div>
                                <h1>{text}</h1>

                                <button className={styles.login_btn} type="submit">
                                    Send
                                </button>


                            </form>
                        </div>
                    </div>
                </div>






            </div>
            <div>
                <h1 className={styles.category_name}>Similar products</h1>
                <ProductList data={categoryData} />
            </div>
        </>
    )
}

export default ProductDetails