import React, { useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

// --------React Icons -----------//
import { IoStarSharp } from "react-icons/io5";
import { LuPlus } from 'react-icons/lu';
import StarIcon from '@mui/icons-material/Star';

// --------Library-------//
import { motion } from 'framer-motion'

// ----------Components----------//
import styles from './styles.module.scss'
import { formatCurrency } from '../../Constants/utils/moneyCurrent';
import products from '../../Constants/data/products'
// import products from '../../Constants/data/products';
import ProductList from '../../UI_Design/ProductList';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../Redux/slice/cartSlice';
import { toast } from 'react-toastify';
import { Box, Rating } from '@mui/material';

// -----------Stars----------//




const ProductDetails = () => {

    const { id } = useParams()

    // ----------States -----------//
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')
    const product = products.find(item => item.id === id)
    const { imgUrl, productName, price, avgRating, reviews, description, shortDesc, category } = product;
    const [tab, setTab] = useState('desc')


    const categoryData = products.filter((item) => item.category === category)


    const loginUser = () => {

    }
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
    const [ratingText, setRatingText] = useState('');
    const [hover, setHover] = useState(-1);



    const getRatingText = (ratingf) => {
        switch (ratingf) {
            case 0.5: setRatingText('Useless')
                break;
            case 1: setRatingText('Useless+')
                break;
            case 1.5: setRatingText(labels['1.5'])
                break;
            case 2: setRatingText(labels['2'])
                break;
            case 2.5: setRatingText(labels['2.5'])
                break;
            case 3: setRatingText(labels['3'])
                break;
            case 3.5: setRatingText(labels['3.5'])
                break;
            case 4: setRatingText(labels['4'])
                break;
            case 4.5: setRatingText(labels['4.5'])
                break;
            case 5: setRatingText(labels['5'])
                break;
            default: setRatingText('')

        }
    }


    // -------Rewiews----------//

    const rewiewUser = useRef('')
    const reviewMsg = useRef('')
    const dispatch = useDispatch()


    const submitHandler = (e) => {
        e.preventDefault()
       
const reviewUserName = rewiewUser.current.value;
        const reviewUserMsg = reviewMsg.current.value;

        switch (rating) {
            case 0.5: setRatingText('Useless')
                break;
            case 1: setRatingText('Useless+')
                break;
            case 1.5: setRatingText(labels['1.5'])
                break;
            case 2: setRatingText(labels['2'])
                break;
            case 2.5: setRatingText(labels['2.5'])
                break;
            case 3: setRatingText(labels['3'])
                break;
            case 3.5: setRatingText(labels['3.5'])
                break;
            case 4: setRatingText(labels['4'])
                break;
            case 4.5: setRatingText(labels['4.5'])
                break;
            case 5: setRatingText(labels['5'])
                break;
            default: setRatingText('')

        }
         
        const rewiewArr = {
            userName: reviewUserName,
            text: reviewUserMsg,
            rating: rating,
            ratingText: ratingText,
        }
        console.log(rewiewArr);
    }
    const addToCart = () => {
        dispatch(cartActions.addItem({
            id: id,
            images: imgUrl,
            productName: productName,
            price: price,
        }))
        toast.success("Product added successfully!")
    }

    return (
        <>
            <div className={styles.details}>

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
                                <h1>{ratingText}</h1>

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