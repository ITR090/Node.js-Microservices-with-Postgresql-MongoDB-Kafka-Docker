import React, { useState, useEffect } from 'react'
// libs
import Body from '../components/UI/Body';
import Loader from '../components/UI/Loader';
import useFetch from '../hooks/useFetch';
import { getOrders } from '../services/ApiService';


const getStatusColor = (status) => {
    switch (status) {
        case "Delivered":
            return "bg-green-100 text-green-700";
        case "Pending":
            return "bg-yellow-100 text-yellow-700";
        case "Cancelled":
            return "bg-red-100 text-red-700";
        default:
            return "bg-gray-100 text-gray-700";
    }
};

const OrdersPage = () => {

    const [openOrder, setOpenOrder] = useState(null);
    const { data: orders, loading, error } = useFetch(getOrders);

    if (loading) {
        return <Loader fullScreen text="Fetching data..." />
    }

    return (
        <Body>
            <div className="p-6 max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">My Orders</h1>

                <div className="space-y-4">
                    {orders.map((order) => (
                        <div
                            key={order._id}
                            className="border rounded-2xl shadow-sm p-4 bg-white"
                        >
                            {/* Header */}
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-semibold">{order._id}</p>
                                    <p className="text-sm text-gray-500">{order.createdAt}</p>
                                </div>

                                <div className="flex items-center gap-4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                                            order.orderStatus
                                        )}`}
                                    >
                                        {order.orderStatus}
                                    </span>

                                    <button
                                        onClick={() =>
                                            setOpenOrder(openOrder === order._id ? null : order._id)
                                        }
                                        className="text-blue-600 text-sm"
                                    >
                                        {openOrder === order._id ? "Hide" : "View"}
                                    </button>
                                </div>
                            </div>

                            {/* Details */}
                            {openOrder === order._id && (
                                <div className="mt-4 border-t pt-4">
                                    {order.cart_items.map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex justify-between text-sm mb-2"
                                        >
                                            <span>
                                                {item.name} x{item.qty}
                                            </span>
                                            <span>${item.price}</span>
                                        </div>
                                    ))}

                                    <div className="flex justify-between font-semibold mt-3">
                                        <span>Total</span>
                                        <span>${order.payment_amount}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </Body>
    )
}

export default OrdersPage



