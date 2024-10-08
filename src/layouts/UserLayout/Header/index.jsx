

import React from 'react'
import Navbar from './Navbar'
import Banner from './Banner'
import SearchBar from './SearchBar'

const Header = () => {

    return (
        <>
            <Navbar notChange={true}/>
            <Banner />
            <SearchBar />
        </>
    )
}

export default Header