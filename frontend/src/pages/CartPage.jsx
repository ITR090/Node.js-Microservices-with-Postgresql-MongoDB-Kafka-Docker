import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom'
// context
import { CartContext } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { create_payment } from "../services/ApiService";
// UI & compoments
import Loader from "../components/UI/Loader";
import EmptyCart from "../components/cart/EmptyCart";

const CartPage = () => {


    const { cartItems, removeFromMyCart, increaseQty, decreaseQty, makePayment,loading, error } = useContext(CartContext);
    const [paymentLoading, setIsPaymentLoading] = useState(false)
   
    const navigate = useNavigate();

    const subtotal = cartItems?.length !==0 && cartItems?.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    if (loading) {
        return <Loader fullScreen text="Fetching data..." />
    }

    if (paymentLoading) {
        return <Loader fullScreen text="Procceding with payment..." />
    }

    if (error) {
        return <p>Error loading cart items: {error.message}</p>;
    }

    if (cartItems.length === 0) {
        return <EmptyCart />
    }

    const handlePayment = async () => {

        
        try {
            setIsPaymentLoading(true)

            const payment_data = {
                payment_method: "card",
                payment_amount: subtotal?.toFixed(2),
                cart_items: cartItems
            }

            const response = await makePayment(payment_data)
            
            if(response.code ==201){
                navigate('/OrderSuccess', { state: { data: response, cartItems, subtotal } })
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsPaymentLoading(true)
        }

    }

    return (
        <div className="min-h-screen bg-base-200 p-6">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                    <h1 className="text-2xl font-bold">Your Cart</h1>

                    {cartItems?.map((item) => (
                        <div
                            key={item?.id}
                            className="card card-side bg-base-100 shadow-md"
                        >
                            <figure className="w-32">
                                <img
                                    src={item?.image_url}
                                    alt={item?.name}
                                    className="h-full w-full object-cover"
                                />
                            </figure>

                            <div className="card-body">
                                <div className="flex justify-between">
                                    <h2 className="card-title">{item.name}</h2>
                                    <button onClick={() => removeFromMyCart(item)} className="btn btn-sm btn-ghost text-error">
                                        ✕
                                    </button>
                                </div>

                                <p className="text-sm text-gray-500">
                                    ${item?.price}
                                </p>

                                <div className="flex items-center justify-between mt-2">
                                    <div className="join">
                                        <button onClick={() => decreaseQty(item)} className="btn btn-sm join-item">−</button>
                                        <button className="btn btn-sm join-item btn-disabled">
                                            {item?.quantity}
                                        </button>
                                        <button onClick={() => { increaseQty(item) }} className="btn btn-sm join-item">+</button>
                                    </div>

                                    <span className="font-semibold">
                                        ${(item?.price * item?.quantity)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Summary */}
                <div className="card bg-base-100 shadow-md h-fit">
                    <div className="card-body space-y-4">
                        <h2 className="card-title">Order Summary</h2>

                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>${subtotal?.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between">
                            <span>Delivery</span>
                            <span className="badge badge-success">Free</span>
                        </div>

                        <div className="divider" />

                        <div className="flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>${subtotal?.toFixed(2)}</span>
                        </div>

                        <button onClick={handlePayment} className="btn btn-primary w-full">
                            Proceed to Payment
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}


export default CartPage;