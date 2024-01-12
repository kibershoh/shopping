import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { IoCaretUpSharp, } from "react-icons/io5";
import { ImSearch } from "react-icons/im";
import { HiMenuAlt1 } from "react-icons/hi";
import { CgClose } from "react-icons/cg";
import { FaUserAlt } from "react-icons/fa";
import clsx from "clsx";
import navLinks from "../../Constants/navbar";
import { AiOutlineShoppingCart } from "react-icons/ai";
import userImg from '../../assets/me1.jpg'
const Navbar = () => {
    const [sidebar, setSidebar] = useState(false);
    const [profile, setProfile] = useState(false);
    const [input, setInput] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [active, setActive] = useState("");

    //   Functions
    const showSidebar = () => {
        setSidebar(!sidebar);
        console.log(sidebar);
    };

    const Profile = () => {
        setProfile(!profile);
    };

    // Outside sidebar close || istalgan joyni bosilsa yopiladi.
    const sidebarRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target)
            ) {
                setSidebar(false);
                setInput(false);
                setProfile(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    })

    // Navbar scrool height
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            if (scrollTop > 200) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        }
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (



        <div className="w-full fixed z-30" ref={sidebarRef}>
            {/* Navbar desktop */}
            <nav
                className={clsx(
                    "flex justify-between shadow-lg items-center p-3 bg-white max-w-full w-full fixed top-0 left-0",
                    scrolled ? "bg-slate-300 shadow-md" : "bg-white"
                )}
            >
                <Link to={"/"} className="block max-lg:hidden">
                    <h1 className="lg:text-center text-3xl font-bold logotip pl-10">
                        SEDAB
                    </h1>
                </Link>
                <Link to="#" className="block lg:hidden">
                    <button onClick={showSidebar}>
                        <HiMenuAlt1 className="HiMenuAlt1" size={22} />
                    </button>
                </Link>
                <div className="w-1/3 text-left relative pl-10 max-[1000px]:w-full max-[1000px]:pl-2 ">
                    <button
                        className={clsx(
                            "absolute font-bold right-8 top-2 max-[1000px]:right-4",

                        )}
                    >
                        <ImSearch size={19} />
                    </button>
                    <input
                        type="search"
                        placeholder="search"
                        className={clsx(
                            "outline-none mx-3  p-1 pl-10 w-11/12 rounded-lg border-2 shadow-lg focus:border-2 focus:border-blue-600",
                            !input ? "" : " max-md:hidden "
                        )}
                    />
                </div>
                <div className="hidden lg:block flex  items-center">
                    <ul className="flex">
                        {navLinks.map((nav) => (
                            <li
                                key={nav.id}
                                className={clsx(
                                    "text-lg  mr-7 pr-3 links",
                                    active === nav.title ? " " : " "
                                )}
                            >
                                <NavLink
                                    to={nav.path}
                                    className={clsx(
                                        "flex p-1 px-2 rounded rounded-lg",
                                        active === nav.title
                                            ? "w-auto text-blue-800 border-b border-blue-400  "
                                            : "items-center"
                                    )}
                                    onClick={() => {
                                        setToggle(!toggle);
                                        setActive(nav.title);
                                        //   setSidebar(!sidebar);
                                    }}
                                >
                                    {nav.title}
                                </NavLink>
                            </li>
                        ))}
                    </ul>

                </div>
                <div className="flex items-center">

                    <div className="flex justify-between relative items-center">
                        <h1 className="mr-3 ml-1 max-lg:hidden">
                            | Hello, <span className="font-semibold">John</span>
                        </h1>
                        <button className="flex items-center rounded-full border-black" onClick={Profile}>
                            

                            <button onClick={Profile}>
                                <img
                                    src={userImg}
                                    alt=""
                                    className="w-10 h-10 max-md:w-9 max-md:h-9 rounded-full bg-white border-2"

                                />
                            </button>
                        </button>
                    </div>
                    <div
                        className={
                            profile
                                ? "absolute top-20 bg-white border shadow-lg w-1/5 p-3 right-3 max-md:w-1/2 max-lg:w-1/2 max-sm:w-11/12"
                                : "absolute top-20 bg-white border shadow-lg w-1/5 p-3 hidden flex right-3"
                        }
                    >
                        <div className="w-full relative">
                            <h2 className="font-bold">Oybek Saminov</h2>
                            <p>saminovo150947@gmail.com</p>
                            <div className="w-full border border-b-1 border-slate-400"></div>
                            <ul className="py-3">
                                <li>Edit profile</li>
                                <li>Preferences</li>
                                <li className="mt-4">
                                    <button >
                                        <Link to={'/register'} className="bg-blue-600  p-1 rounded text-white mt-3">
                                        Register
                                        </Link>
                                    </button>
                                </li>
                            </ul>
                            <div className="w-full border border-b border-slate-400"></div>
                            <button className="bg-blue-600 p-1 rounded text-white mt-3">
                                <Link to={'/login'}>Login</Link>
                            </button>
                        </div>
                    </div>
                </div>


            </nav>
            {/* Responsive Sidebar */}
            <nav
                className={clsx(
                    "h-screen fixed top-0 bg-slate-200 transition-all duration-700",
                    !sidebar ? "-left-full" : " "
                )}
            >
                <div className="flex justify-between items-center pr-4 pl-2">
                    <Link to="/">
                        <span>
                            <img src={userImg} width={50} className="rounded-full" alt="" />
                        </span>
                    </Link>
                    <CgClose
                        size={23}
                        className="ml-auto hidden max-lg:block"
                        onClick={showSidebar}
                    />
                </div>
                <ul className="pl-10 w-100 mt-8 ">
                    {navLinks.map((nav) => (
                        <li
                            key={nav.id}
                            className={clsx(
                                "text-lg mb-3 mr-7 pr-3 links",
                                active === nav.title ? " border-r-4 border-blue-400" : " "
                            )}
                        >
                            <NavLink
                                to={nav.path}
                                className={clsx(
                                    "flex p-1 px-2 rounded rounded-lg",
                                    active === nav.title
                                        ? "w-auto text-blue-800 bg-blue-200 "
                                        : "items-center"
                                )}
                                onClick={() => {
                                    setToggle(!toggle);
                                    setActive(nav.title);
                                    setSidebar(!sidebar);
                                }}
                            >
                                {nav.title}
                            </NavLink>
                        </li>
                    ))}
                </ul>
                <div className="px-3 pt-56">
                    <div className="flex justify-between relative my-4 items-center">
                        <h1 className="mr-3 ml-1">
                            | Hello, <span className="font-semibold">John</span>
                        </h1>
                        <button className="flex items-center" onClick={Profile}>
                            <div className="bg-white border-black rounded-full">
                                j
                            </div>
                        </button>
                    </div>
                    <h3 className="text-sm">Restourant Admin Dashboard</h3>
                    <p className="text-xs">@2023 All Rights Reserved</p>
                    <p className="pt-3 text-xs">Made wuth by Peterdraw</p>
                </div>
            </nav>
        </div>


    )
}

export default Navbar