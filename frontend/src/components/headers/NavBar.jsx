import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { ThemeProvider, THEME_ID, createTheme } from '@mui/material/styles';
import { Switch } from '@mui/material';
import {motion} from "framer-motion";
import Swal from 'sweetalert2';

import photoURL from "../../assets/home/girl.jpg"

import {FaBars} from "react-icons/fa"
import { AuthContext } from '../../utilities/providers/AuthProvider';

const navLinks = [
    {name: 'Home', route:'/'},
    {name: 'Instructors', route:'/instructors'},
    {name: 'Classes', route:'/classes'},
];

/*const theme = createTheme({
    palette: {
        primary: {
            main: "ff0000",
        },
        secondary: {
            main: "00ff00",
        },
    },
});*/

const NavBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isHome, setIsHome] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isFixed, setIsFixed] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [navBg, setNavBg] = useState('bg-[#15151580');
    const {logout, user} = useContext(AuthContext);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    };
   
    useEffect(() => {
        const darkClass = 'dark';
        const root = window.document.documentElement;
        if(isDarkMode) {
            root.classList.add(darkClass);
        } else {
            root.classList.remove(darkClass);
        }
    }, [isDarkMode]);

    useEffect(() => {
        setIsHome(location.pathname === '/');
        setIsLogin(location.pathname === '/login');
        setIsFixed(location.pathname === '/register' || location.pathname === '/login');
    },[location]);


    useEffect(() => {
        const handleScroll = () => {
            const currentPosition = window.pageYOffset;
            setScrollPosition(currentPosition);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll',handleScroll);
    }, []);

    useEffect(() => {
        if(scrollPosition > 100) {
            if(isHome) {
                setNavBg('bg-white backdrop-filter backdrop-blur-xl bg-opacity-0 dark:text-white text-black')
            }
            else{
                setNavBg('bg-white dark:bg-black dark:text-white text-black')
            }
        } else{
            setNavBg(`${isHome || location.pathname === '/' ? 'bg-transparent' : 'bg-white dark:bg-black'}
            dark:text-white text-white`)
        }
    },[scrollPosition]);

    const handleLogout = (e) => {
        e.preventDefault();
        Swal.fire({
            title: 'Are you sure to logout ?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Logout me!'
        }).then((result) => {
            if (result.isConfirmed) {
                logout()
                    .then(() => {
                        Swal.fire(
                            'Logged out!',
                            'You are logged out successful.',
                            'success'
                        )
                    })
                    .catch(err => {
                        Swal.fire(
                            'Error!',
                            err.message,
                            'error'
                        )
                    })
            }
        })
    }

  return (
    <motion.nav 
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    transition={{duration: 0.5}}
    className={`${isHome ? navBg : "bg-white dark:bg-black backdrop-blur-2xl"} ${isFixed ? 'static' : 'fixed'} top-0 transition-colors duration-500 ease-in-out w-full z-10`} >
        <div className='lg:w-[95%] mx-auto sm:px-6 lg:px-6'>

            <div className="px-4 py-4 flex items-center justify-between">
                {/* logo */}
                <div onClick={() => navigate('/')} className="flex-shrink-0 cursor-pointer pl-7 md:p-0 flex items-center">
                    <div>
                        <h1 className='text-2xl inline-flex gap-3 items-center font-bold'>ChessMaster <img src="/chess-logo.jpg" alt="" className='w-8 h-8'/></h1>
                        <p className='font-bold text-[13px] tracking-[8px]'>Quick Explore </p>
                    </div>
                </div>

                {/* mobile menu icons */}

                <div className="md:hidden flex items-center">
                    <button type="button" onClick={toggleMobileMenu} className="text-gray-300 hover:text-white focus-outline-none">
                        <FaBars className="h-6 w-6 hover:text-primary"/>
                    </button>
                </div>

                {/* Navigational Links */}
                <div className='hidden md:block text-black dark:text-white'>
                    <div className='flex'>
                        <ul className='ml-10 flex items-center space-x-4 pr-4'>
                            {navLinks.map((Link) => (
                                    <li key={Link.route}>
                                        <NavLink 
                                        to={Link.route}
                                        style={{whiteSpace: 'nowrap'}}
                                        className={({ isActive }) =>
                                        `font-bold ${isActive ? 'text-secondary' : `${navBg.includes('bg-transparent') ? 'text-white' : 'text-black dark:text-white'}`} hover:text-secondary duration-30`
                                    }
                                >
                                    {Link.name}
                                </NavLink>
                            </li>
                        ))}

                        {/*  based on users  */}
                        {user ? null: isLogin ? <li><NavLink to="/register"  className={({ isActive }) =>
                            `font-bold ${isActive ? "text-secondary" : `${navBg.includes("bg-transparent") ? "text-white" : "text-black dark:text-white"}`} hover:text-secondary duration-30`
                            }>Register</NavLink></li> : <li><NavLink to="/login"  className={({ isActive }) =>
                            `font-bold ${isActive ? "text-secondary" : `${navBg.includes("bg-transparent") ? "text-white" : "text-black dark:text-white"}`} hover:text-secondary duration-30`
                        }>Login</NavLink></li>
                        }
                        
                        {
                            user && <li>
                                <NavLink to='/dashboard'  className={({ isActive }) =>
                            `font-bold ${isActive ? "text-secondary" : `${navBg.includes("bg-transparent") ? "text-white" : "text-black dark:text-white"}`} hover:text-secondary duration-30`
                            }>Dashboard</NavLink>
                            </li>
                        }

                        {
                            user && <li>
                                <img src={ photoURL } alt="" className="h-[40px] rounded-full w-[40px]"/>
                            </li>
                        }

                        {
                            user && <li>
                                <NavLink onClick={handleLogout} className={'font-bold px-3 py-2 bg-secondary text-white rounded-xl'}>
                                    Logout
                                </NavLink>
                            </li>
                        }

                                {/* color toggle 
                               <ThemeProvider theme={theme}></ThemeProvider>*/}
                                <li>    
                                <div className="flex flex-col justify-center items-center">
                                        <Switch onChange={() => setIsDarkMode(!isDarkMode)}/>
                                        <h1 className="text-[8px]">Light/Dark</h1>
                                </div>    
                                   
                            </li> 
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </motion.nav>
  ) 
}

export default NavBar
