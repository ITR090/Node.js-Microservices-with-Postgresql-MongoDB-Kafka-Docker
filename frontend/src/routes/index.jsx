
import {createBrowserRouter} from 'react-router-dom'
import Layout from './Layout'
// pages
import HomePage from '../pages/HomePage'
import RestaurantDetailsPage from '../pages/RestaurantDetailsPage'
import CartPage from '../pages/CartPage'
import ErrorPage from '../pages/ErrorPage'
import OrderSuccessPage from '../pages/OrderSuccessPage'
import OrdersPage from '../pages/OrdersPage'
import LoginPage from '../pages/Auth/LoginPage'

export const routers_definitions =createBrowserRouter([
    {
        path:'/',
        element: <Layout/>,
        errorElement:<ErrorPage/>,
        children:[
           {path:'/', element:<HomePage/>},
           {path:'/restaurant/:id', element: <RestaurantDetailsPage />}, 
           {path:'/cart', element: <CartPage />},
           {path:'/OrderSuccess', element:<OrderSuccessPage/>},
           {path:'/myorders', element:<OrdersPage/>},
           {path:'login', element:<LoginPage/>}
        ]
    }
])
