import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import 'animate.css';

const Navbar = () => {

    const [scroll, setScroll] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);

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

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    return (
        <>
            <nav className={`fixed w-full z-[990] py-5 nav-menu duration-500 text-white ${scroll ? 'bg-black costum-navbar' : 'bg-transparent'} smm:bg-black lg:bg-transparent`}>
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    {/* logo */}
                    <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="/logo.png" className="h-8" alt="AirBnb Logo" />
                        <span
                            class="self-center text-2xl font-semi font-bold whitespace-nowrap text-[#FE6B6E] duration-500 hover:text-rose-600"
                        >
                            airbnb
                        </span>
                    </a>

                    {/* dropdown */}
                    <div className='relative flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse'>
                        {/* Dropdown user-dropdown */}
                        <button
                            type="button"
                            className=" text-sm bg-main rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 font-bold duration-300 hover:scale-105 hover:bg-white hover:text-white"
                            id="user-menu-button"
                            aria-expanded={dropdownVisible ? 'true' : 'false'}
                            onClick={toggleDropdown}
                        >
                            <img className="h-10" src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png" />
                        </button>

                        {/* Dropdown user-dropdown */}
                        <div
                            className={`absolute z-[999] my-4 text-base right-2/4  list-none bg-white divide-y divide-gray-100 rounded-lg shadow animate__animated animate__fadeInDown top-8 ${dropdownVisible ? '' : 'hidden'}`}
                            id="user-dropdown"
                        >
                            <div className='px-3 w-40 py-3  space-x-5 mx-auto'>
                                <ul className="py-2 space-y-2" aria-labelledby="user-menu-button">
                                    <li>
                                        <button
                                            className="block text-center px-5 w-full rounded py-2 text-sm text-gray-700 hover:bg-gray-300"
                                        >
                                            Đăng nhập
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className="block text-center px-5 w-full rounded py-2 text-sm text-gray-700 hover:bg-gray-300"
                                        >
                                            Đăng ký
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Dropdown main menu button for mobile */}
                        <button
                            data-collapse-toggle="navbar-user"
                            type="button"
                            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                            aria-controls="navbar-user"
                            aria-expanded={menuVisible ? 'true' : 'false'}
                            onClick={toggleMenu}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"></path>
                            </svg>
                        </button>
                    </div>

                    {/* main menu */}
                    <div className={`items-center w-full md:flex md:w-auto md:order-1 ${menuVisible ? 'block animate__animated animate__fadeInDown' : 'hidden'} duration-500`}>
                        <ul className="menu-phone flex flex-col font-medium p-4 md:p-0 mt-4 border smm:text-white border-gray-100 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 ">
                            <li>
                                <a aria-current="page" className={`text-[#FE6B6E] block py-2 px-3 rounded md:p-0 hover:bg-gray-100 duration-300`} href="/">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a aria-current="page" className={`block py-2 px-3 rounded ${scroll ? 'text-black' : 'text-white'} hover:bg-gray-100 hover:text-[#FE6B6E] md:hover:bg-transparent  md:p-0 duration-300 active`} href="/">
                                    About
                                </a>
                            </li>
                            <li>
                                <a aria-current="page" className={`block py-2 px-3 rounded ${scroll ? 'text-black' : 'text-white'} hover:bg-gray-100 hover:text-[#FE6B6E] md:hover:bg-transparent  md:p-0 duration-300 active`} href="/">
                                    Services
                                </a>
                            </li>
                            <li>
                                <a href="#" className={`block py-2 px-3 rounded ${scroll ? 'text-black' : 'text-white'} hover:bg-gray-100 hover:text-[#FE6B6E] md:hover:bg-transparent  md:p-0 duration-300 active`}>
                                    Pricing
                                </a>
                            </li>
                            <li>
                                <a href="#" className={`block py-2 px-3 rounded ${scroll ? 'text-black' : 'text-white'} hover:bg-gray-100 hover:text-[#FE6B6E] md:hover:bg-transparent  md:p-0 duration-300 active`}>
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar