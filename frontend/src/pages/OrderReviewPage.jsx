import React from "react"
import { useLocation } from 'react-router-dom';

const OrderReviewPage = ({})=>{
    
    const {state} = useLocation();
    console.log(state)
    return (
        <div>
            <h1>Order Status: {state.data.message}</h1>
            <h1>Order Details</h1>
            <p>subtotal {state.subtotal}</p>
            {state.cartItems.map((item)=>{
                return <div>
                    <p>Name:{item.name}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: {item.price}</p>
                </div>
            })}

            <p>Email Notification will be send shortly</p>
        </div>
    )
}

export default OrderReviewPage