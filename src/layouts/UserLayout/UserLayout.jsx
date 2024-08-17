import React from "react"
import Header from "./Header"
import Footer from "./Footer"

const UserLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default UserLayout
