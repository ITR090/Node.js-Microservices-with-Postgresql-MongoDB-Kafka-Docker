import React from 'react';
import Navbar from '../components/UI/Navbar';
import Body from '../components/UI/Body';
import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <> 
         <Navbar />
         <Body>
            <Outlet />
         </Body>
        </>
    )
}
export default Layout;    