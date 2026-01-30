
import {createBrowserRouter} from 'react-router-dom'
import Layout from './Layout'
// pages
import HomePage from '../pages/HomePage'
import RestaurantDetailsPage from '../pages/RestaurantDetailsPage'
import CartPage from '../pages/CartPage'
import ErrorPage from '../pages/ErrorPage'
import OrderReviewPage from '../pages/OrderReviewPage'

export const routers_definitions =createBrowserRouter([
    {
        path:'/',
        element: <Layout/>,
        errorElement:<ErrorPage/>,
        children:[
           {path:'/', element:<HomePage/>},
           {path:'/restaurant/:id', element: <RestaurantDetailsPage />}, 
           {path:'/cart', element: <CartPage />},
           {path:'/order', element:<OrderReviewPage/>}
        ]
    }
])
