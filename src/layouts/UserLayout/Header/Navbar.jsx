import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {

    const [scroll, setScroll] = useState(false);

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
            style={{ backgroundColor: `${!scroll ? 'transparent' : 'white'} `, transition: "1.5s" }}
            className="border-gray-200 dark:border-gray-700 z-10 w-full fixed shadow-xl"
        >
            <div className=" max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-0 h-16 ">
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
                {/* <button
                data-collapse-toggle="navbar-dropdown"
                type="button"
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
            </button> */}
                <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown">
                    <ul className="list-none flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:border-gray-700 bg-transparent">
                        <li>
                            <a href="/" className="block py-2 px-3 md:p-0 text-white bg-blue-900 rounded md:bg-transparent md:text-blue-600 md:dark:text-orange-600 font-sans text-lg" aria-current="page">Home</a>
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
                    </ul>

                </div>
                <div className='w-[185px]'>
                    <ul className="list-none flex justify-center w-full ">
                        <li className='w-1/2'>
                            <Link
                                to="/auth/login"
                                className="button-gradient block text-center py-2 px-3 text-black bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-1 md:dark:text-white no-underline cursor-pointer"
                                aria-current="page"
                            >
                                Đăng nhập
                            </Link>
                        </li>
                        <span className="text-xl text-gray-500">|</span>
                        <li className='w-1/2'>
                            <Link
                                to="/auth/register"
                                className="button-gradient block text-center py-2 px-3 text-black bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-1 md:dark:text-white no-underline cursor-pointer"
                                aria-current="page"
                            >
                                Đăng ký
                            </Link>
                        </li>
                    </ul>
                    <ul className="list-none flex items-center">
                        {/* <li>
                            <Link
                                className="no-underline block py-2 px-3 text-gray-700 text-xl bg-blue-700 rounded md:bg-transparent md:p-1 dark:bg-blue-600 md:dark:bg-transparent hover:text-red-600"
                                aria-current="page"
                            >
                                <UserOutlined />
                            </Link>
                        </li> */}

                        {/* <li>
                        <Button
                            className="mx- font-medium"
                            size="small"
                            type="default"
                            danger
                        >
                            Đăng xuất
                        </Button>
                    </li> */}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar