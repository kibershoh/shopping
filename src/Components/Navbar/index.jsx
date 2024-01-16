//--------------- Library---------------//

import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import clsx from "clsx";
// -----------React-icons-----------//

import { IoCaretUpSharp, } from "react-icons/io5";
import { HiMenuAlt1 } from "react-icons/hi";
import { CgClose } from "react-icons/cg";
import { FaUserAlt } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";

//----------------Files---------------- //

import navLinks from "../../Constants/navbar";
import userImg from '../../assets/me1.jpg'
import styles from './style.module.scss'
import MotionText from "../../Constants/Framer-Motions/ForNavbar/logo";

// ----------- Firebase ------------------//
import {onAuthStateChanged, signOut} from 'firebase/auth'
import {auth} from '../../Firebase/config'
import { toast } from "react-toastify";

// Components



// const logo = (
//     <div className={styles.logo}>
//         {/* <Link to={'/'}>Xurmo</Link> */}
//         <motion.h1

//             whileHover={{ scale: 1.2 }}
//         >
//             Xurmo
//         </motion.h1>
//     </div>
// )




const Navbar = () => {
    // All States
    const [active, setActive] = useState(false)
    const [scrolled, setScrolled] = useState(false);
    const [show, setShow] = useState(false)
    const [activeLink, setActiveLink] = useState('')
    const [activeLink2, setActiveLink2] = useState('')
    const [authLinks, setAuthLinks] = useState('')
    const [displayName,setDisplayName] = useState("")
    const navigate = useNavigate()
    // Functions//


    //  for Login and Register
    const ProfileHandler = () => {
        setActive(!active)
    }

    // for Sidebar
    const showClick = () => {
        setShow(!show)
    }


    // Active Link Handler
    const activeLinkHandler = (title) => {
        setActiveLink(title)
        document.title = title
    }

    // Refs
    const ProfileRef = useRef(null);

    //-----------useEffects()--------------//


    // For Navbar and Sidebar
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                ProfileRef.current &&
                !ProfileRef.current.contains(event.target)
            ) {
                setActive(false);
                setShow(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    })

    // Scrolled
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            if (scrollTop > 200) {
                setScrolled(true);
            }
            else {
                setScrolled(false)
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
// Monitor currently sign in user
    useEffect(()=>{
        onAuthStateChanged(auth,(user)=>{
            if(user){
                const uid = user.uid
                console.log(user.displayName);
                setDisplayName(user.displayName)
            }
            else{
                setDisplayName(" ")
                
            }
        })
    },[])

// -------------------FIREBASE---------------------------Logout------------//
const logoutUser = (e)=>{
    e.preventDefault()

    signOut(auth).then(()=>{
        toast.success("Logout successfuly.")
        navigate('/')
        setActive(false)


    }).catch((error)=>{
        toast.error(error.message)

    })
}








    return (
        <nav
            ref={ProfileRef}
            className={clsx(styles.header,
                scrolled ? styles.scrolled : styles.unscrolled,

            )}>
            {/* -----------Desktop Navbar----------- */}
            <div className={styles.navbar}>
                <Link to={'/'} className={styles.logo}>
                    <MotionText logo={"Xurmo"} />
                </Link>
                <HiMenuAlt1 onClick={showClick} size={25} className={styles.menu_icon} />

                <nav>
                    {/* -----------Navbar Links----------- */}
                    <ul>
                        {
                            navLinks.map((nav, inx) => (
                                <li key={nav.id}>
                                    <Link onClick={() => activeLinkHandler(nav.title)} to={nav.path}
                                        classes={clsx(
                                            activeLink === nav.title ? styles.activeLink : '', styles.unActiveLink
                                        )}
                                    >
                                        <MotionText logo={nav.title} classes={clsx(
                                            activeLink === nav.title ? styles.activeLink : '', styles.unActiveLink
                                        )} />
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                    {/* -----------Cart----------- */}

                    <div className={styles.cart}>
                        <Link to="/orders">
                            <AiOutlineShoppingCart className={styles.icon_shop} size={23}
                                onClick={() => {
                                    document.title = 'Orders';
                                }}
                            />
                            <span>
                                12
                            </span>
                        </Link>
                    </div>
                    {/* -----------Profile----------- */}

                    <div className={styles.profile} ref={ProfileRef}>

                        <h1>
                           Hi | <span>{displayName}</span>
                        </h1>
                        <button className={styles.btn_profile} onClick={ProfileHandler} >
                            <img
                                src={userImg}
                                alt="person"
                            />
                            <button onClick={ProfileHandler} className={styles.user_icon}>
                                <FaUserAlt size={23} />
                            </button>
                        </button>
                        {/* -----------Authentication------------ */}
                        <div className={
                            clsx(
                                styles.auth_modal,
                                active ? styles.block : styles.hidden
                            )
                        }>

                            <div className={styles.links_auth}>
                                <IoCaretUpSharp size={17} className={styles.top_icon} />
                                <span className={styles.links}>
                                    <Link
                                        onClick={() => {
                                            setAuthLinks('My Orders')
                                            setActive(false)
                                        } }

                                        className={clsx(
                                            authLinks === 'My Orders' ? styles.authActiveLinks : ''
                                        )} to={"/order-history"}>My Orders</Link>
                                    <Link
                                        onClick={() => {
                                            setAuthLinks('Register')
                                            setActive(false)
                                        } }

                                        className={clsx(
                                            authLinks === 'Register' ? styles.authActiveLinks : ''
                                        )} to={"/register"}>Register</Link>
                                    <Link
                                        onClick={() => {
                                            setAuthLinks('Login')
                                            setActive(false)

                                        } }

                                        className={clsx(
                                            authLinks === 'Login' ? styles.authActiveLinks : ''
                                        )} to={"/login"}>Login</Link>
                                    <Link
                                        onClick={logoutUser}
                                        className={styles.logout}
                                        >Logout</Link>
                                </span>
                            </div>
                        </div>
                    </div>
                </nav>

            </div>

            {/* -----------Sidebar Responsive------------ */}

            <div className={clsx(styles.sidebar,
                show ? styles.right : styles.left

            )}
                ref={ProfileRef}>
                <div className={styles.logo_close}>
                    <Link to={'/'} className={styles.logo}><MotionText logo={"Xurmo"} classes={''} /></Link>
                    <CgClose onClick={showClick} className={styles.close_btn} size={22} />
                </div>

                {/* -----------Sidebar Links------------ */}
                <ul>
                    {
                        navLinks.map((nav) => (
                            <li key={nav.id}>
                                <Link
                                    to={nav.path}
                                    onClick={() => {
                                        activeLinkHandler(nav.title)
                                        setShow(false)
                                    }}
                                    className={clsx(
                                        activeLink === nav.title ? styles.activeLink : ''
                                    )}
                                >
                                    {nav.title}
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </nav>
    )
}

export default Navbar