import React from "react"
import { useLocation } from 'react-router-dom';
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const OrderSuccessPage = ({ }) => {

    const {state} = useLocation();
    console.log(state)

    const order = {
        id: "ORD-123456",
        items: [
            {
                id: 1,
                name: "Chicken Burger",
                price: 25,
                quantity: 2,
                image: "https://via.placeholder.com/80",
            },
            {
                id: 2,
                name: "Fries",
                price: 10,
                quantity: 1,
                image: "https://via.placeholder.com/80",
            },
        ],
        address: "Riyadh, King Fahd Road, Building 123",
        paymentMethod: "Credit Card (**** 4242)",
    };

    // const subtotal = order.subtotal.reduce(
    //     (acc, item) => acc + item.price * item.quantity,
    //     0
    // );
    // const tax = subtotal * 0.15;
    // const total = subtotal + tax;


    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-3xl mx-auto space-y-6">

                {/* SUCCESS HEADER */}
                <div className="bg-white p-6 rounded-2xl shadow text-center">
                    <CheckCircle className="mx-auto text-green-500" size={60} />
                    <h1 className="text-2xl font-bold mt-4">Order Placed Successfully!</h1>
                    {/* <p className="text-gray-500 mt-2">
                        Your order <span className="font-semibold">{order.id}</span> has been confirmed.
                    </p> */}
                </div>

                {/* ORDER ITEMS */}
                <div className="bg-white p-5 rounded-2xl shadow">
                    <h2 className="text-lg font-semibold mb-4">Order Details</h2>

                    {state.cartItems.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center justify-between border-b py-3"
                        >
                            <div className="flex items-center gap-4">
                                <img
                                    src={item.image_url}
                                    alt={item.name}
                                    className="w-14 h-14 rounded-lg"
                                />
                                <div>
                                    <p className="font-medium">{item.name}</p>
                                    <p className="text-sm text-gray-500">
                                        Quantity: {item.quantity}
                                    </p>
                                </div>
                            </div>
                            <p className="font-semibold">
                                {item.price * item.quantity} SAR
                            </p>
                        </div>
                    ))}
                </div>

                {/* DELIVERY + PAYMENT */}
                {/* <div className="bg-white p-5 rounded-2xl shadow space-y-3">
                    <div>
                        <h3 className="font-semibold">Delivery Address</h3>
                        <p className="text-gray-500">{order.address}</p>
                    </div>

                    <div>
                        <h3 className="font-semibold">Payment Method</h3>
                        <p className="text-gray-500">{order.paymentMethod}</p>
                    </div>
                </div> */}

                {/* SUMMARY */}
                <div className="bg-white p-5 rounded-2xl shadow">
                    <h3 className="font-semibold mb-3">Summary</h3>

                    <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span>{state.subtotal.toFixed(2)} SAR</span>
                    </div>

                    {/* <div className="flex justify-between text-gray-600">
                        <span>VAT (15%)</span>
                        <span>{tax.toFixed(2)} SAR</span>
                    </div> */}

                    <div className="border-t my-3"></div>

                    <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>{state.subtotal.toFixed(2)} SAR</span>
                    </div>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex gap-4">
                    {/* <button className="flex-1 bg-black text-white py-3 rounded-xl hover:bg-gray-800">
                        Track Order
                    </button> */}
                    <Link to="/" className="flex-1 text-center border py-3 rounded-xl hover:bg-gray-100">
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default OrderSuccessPage


