import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-scroll';
import { getLocalStorage, removeLocalStorage } from '../../../utils';
import { PATH } from '../../../routes/path';
import { useDispatch } from 'react-redux';
import { removeUser } from "../../../redux/slices/user.slice";

const Navbar = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [scroll, setScroll] = useState(false);

    const currentUser = getLocalStorage("user");

    const handleLogOut = () => {
        dispatch(removeUser(null));
        removeLocalStorage("user");
        removeLocalStorage("token");
        navigate(PATH.HOME);
        window.location.reload();
    };

    const [dropdownOpen, setDropdownOpen] = useState(false);


    const handleDropdownToggle = () => {
        setDropdownOpen(!dropdownOpen);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setScroll(true);
            } else {
                setScroll(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return (
        <nav
            style={{ backgroundColor: `${!scroll ? 'transparent' : 'white'} `, transition: "1s" }}
            className="border-gray-200 dark:border-gray-700 z-10 w-full fixed shadow-xl"
        >
            <div className=" container flex flex-wrap items-center justify-between mx-auto h-16 sm:w-full md:w-full ">
                <Link
                    to="/"
                    className="space-x-3 rtl:space-x-reverse w-[185px]"
                >
                    <div className='flex items-center justify-between w-full'>
                        <img
                            src="/logo.png"
                            className="cursor-pointer h-9 "
                            alt="Airbnb Logo"
                        />
                        <span className='text-2xl w-3/4 font-semibold text-orange-600 hover:text-red-600 cursor-pointer'>AirBnb</span>
                    </div>
                </Link>
                <div className='h-full flex items-center md:hidden '>
                    <button
                        onClick={handleDropdownToggle}
                        data-collapse-toggle="navbar-dropdown"
                        type="button"
                        className="flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700"
                        aria-controls="navbar-dropdown"
                        aria-expanded="false"
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 17 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M1 1h15M1 7h15M1 13h15"
                            />
                        </svg>
                    </button>
                </div>
                <div className={`${dropdownOpen ? 'block' : 'hidden'} block w-full md:block md:w-auto`} id="navbar-dropdown">
                    <ul className="list-none flex flex-col font-medium p-4 md:p-0 mt-4 border rounded-lg xs:bg-gray-400 md:bg-transparent md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
                        <li>
                            <a href="/" className="block py-2 px-3 md:p-0 xs:text-white xs-plus:text-white sm:text-white rounded md:bg-transparent xs:bg-orange-500 xs-plus:bg-orange-500 sm:bg-orange-500 md:text-orange-600 font-sans text-lg" aria-current="page">Home</a>
                        </li>
                        <li>
                            <a href="#" className={`${!scroll ? 'navbar' : 'navbar-scroll'} block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-orange-600 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 font-sans text-lg`}>About</a>
                        </li>
                        <li>
                            <a href="#" className={`${!scroll ? 'navbar' : 'navbar-scroll'} block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-orange-600 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 font-sans text-lg`}>Services</a>
                        </li>
                        <li>
                            <a href="#" className={`${!scroll ? 'navbar' : 'navbar-scroll'} block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-orange-600 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 font-sans text-lg`}>Contact</a>
                        </li>
                        <li className='sm:block md:hidden'>
                            {!currentUser ? (<ul className=" list-none flex justify-end items-center w-full border-t-2 mt-3 pt-3">
                                <li className='w-1/5 xs:w-1/2'>
                                    <Link
                                        to="/auth/login"
                                        className="button-gradient block text-center sm:p-1 sm:flex sm:justify-center py-2 px-3 rounded-md p-1 text-white no-underline cursor-pointer"
                                        aria-current="page"
                                    >
                                        Đăng nhập
                                    </Link>
                                </li>
                                <span className="text-lg text-gray-400">|</span>
                                <li className='w-1/5 xs:w-1/2'>
                                    <Link
                                        to="/auth/register"
                                        className="button-gradient block text-center sm:p-1 sm:flex sm:justify-center py-2 px-3 rounded-md p-1 text-white no-underline cursor-pointer"
                                        aria-current="page"
                                    >
                                        Đăng ký
                                    </Link>
                                </li>
                            </ul>) : (<ul className="list-none flex items-center justify-between border-t-2 w-full mt-3">
                                <li className='w-1/2'>
                                    <Link
                                        to='/profile'
                                        className="no-underline flex justify-start items-center w-fit gap-3 py-2 px-3 text-white text-xl rounded"
                                        aria-current="page"
                                    >
                                        <img src={currentUser.avatar ? currentUser.avatar : 'https://cdn-icons-png.flaticon.com/512/6596/6596121.png'} alt="" className='w-[50px] h-[50px] rounded-full object-cover' />
                                        <span className={` text-sm hover:text-gray-400`}>{currentUser?.name}</span>
                                    </Link>
                                </li>
                                <li className='w-1/5 xs:w-1/3 xs-plus:w-1/3'>
                                    <Button
                                        onClick={handleLogOut}
                                        className="button-gradient block text-center w-full sm:p-1 sm:flex sm:justify-center py-2 px-3 rounded-md p-1 text-white no-underline cursor-pointer"
                                        size="small"
                                        type="default"
                                        danger
                                    >
                                        Đăng xuất
                                    </Button>
                                </li>
                            </ul>)}
                        </li>
                    </ul>

                </div>
                <div className='w-[185px] h-16 flex items-center xs:hidden xs-plus:hidden sm:hidden md:block md:h-fit'>

                    {!currentUser ? (<ul className="list-none flex justify-center items-center w-full">
                        <li className='w-1/2'>
                            <Link
                                to="/auth/login"
                                className="button-gradient block text-center sm:p-1 sm:flex sm:justify-center py-2 px-3 rounded-md p-1 text-white no-underline cursor-pointer"
                                aria-current="page"
                            >
                                Đăng nhập
                            </Link>
                        </li>
                        <span className="text-lg text-gray-400">|</span>
                        <li className='w-1/2'>
                            <Link
                                to="/auth/register"
                                className="button-gradient block text-center sm:p-1 sm:flex sm:justify-center py-2 px-3 rounded-md p-1 text-white no-underline cursor-pointer"
                                aria-current="page"
                            >
                                Đăng ký
                            </Link>
                        </li>
                    </ul>) : (<ul className="list-none flex items-center justify-between w-full h-full">
                        <li className='w-1/2'>
                            <Link
                                to='/profile'
                                className="no-underline flex justify-center items-center gap-1 py-2 px-3 text-gray-700 text-xl bg-blue-700 rounded md:bg-transparent md:p-1 dark:bg-blue-600 md:dark:bg-transparent hover:text-red-600"
                                aria-current="page"
                            >
                                <img src={currentUser.avatar ? currentUser.avatar : 'https://cdn-icons-png.flaticon.com/512/6596/6596121.png'} alt="" className=' w-[40px] h-[40px] rounded-full object-cover' />
                                <span className={` ${!scroll ? 'navbar' : 'navbar-scroll'} text-sm hover:text-red-600`}>{currentUser?.name}</span>
                            </Link>
                        </li>
                        <li className='w-1/2'>
                            <Button
                                onClick={handleLogOut}
                                className="button-gradient block w-full text-center py-2 px-3 text-black bg-blue-700 rounded-md md:bg-transparent md:text-blue-700 md:p-1 md:dark:text-white no-underline cursor-pointer"
                                size="small"
                                type="default"
                                danger
                            >
                                Đăng xuất
                            </Button>
                        </li>
                    </ul>)}
                </div>
            </div>
        </nav>
    )
}

export default Navbar