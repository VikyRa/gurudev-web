import React from 'react'
import { Footer } from '../Footer'
import { Header } from '../Header'
import MetaData from '../Header/MetaData'

/**
* @author
* @function Layout
**/

const Layout = (props) => {
  return (
    <>
      
      <Header title={props.title}/>
        {props.children}
      <Footer />
    </>
  )

}

export default Layout;