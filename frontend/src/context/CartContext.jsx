import React, { createContext, useState } from "react";
import useFetch from "../hooks/useFetch";
import { useToast } from "./ToastContext";
import { getCartItems, addToCart, removeFromCart,create_payment } from "../services/ApiService";

const CartContext = createContext({
    cartItems: [],
    addToMyCart: () => { },
    removeFromMyCart: () => { },
    cartCounter: 0,
    isAvailableInCart: () => { },
    getCartItems: () => { },
    increaseQty: () => { },
    decreaseQty: () => { },
    makePayment:()=>{},
    loading: false,
    error: null,
});

const CartProvider = ({ children }) => {


    const { showToast } = useToast()
    const { data: cartItems, loading, error, setData } = useFetch(getCartItems);
    const [cartCounter, setCartCounter] = useState(0);

    const isAvailableInCart = (mealId) => {
        return cartItems.find(item => item.id === meal.id);
    }

    const addToMyCart = async (meal) => {

        try {
            const results = await addToCart(meal);

            if (results && !results.code) {
                const newCartItems = cartItems.concat(results.data)
                setData(newCartItems);
                setCartCounter(cartCounter => cartCounter + 1);
                showToast({
                    message: results.message,
                    type: "success",
                })
                return {
                    code: 200, message: results.message
                }
            }

            if (results.code == 400) {
                showToast({
                    message: results.message,
                    type: "warning",
                })
                return {
                    code: 400, message: results.message
                }
            }

            if (results.code == 500) {
                return {
                    code: 500, message: results.message
                }
            }

        } catch (error) {
            console.error("Error adding item to cart:", error);
        }

    };

    const removeFromMyCart = async (mealId) => {

        try {
            const results = await removeFromCart(mealId.id);
            if (results.status == 200) {
                const newCartItems = cartItems.filter(item => item.id !== mealId.id);
                setData(newCartItems);
                setCartCounter(cartCounter => cartCounter - 1);
                showToast({
                    message: results.data.message,
                    type: "error",
                })
            }

        } catch (error) {
            console.error("Error removing item from cart:", error);
        }
    };

    const increaseQty = (meal) => {

        try {
            const updatedCartItems = cartItems.map((item) => item.id == meal.id ? { ...item, quantity: item.quantity + 1 } : { ...item })
            setData(updatedCartItems)
        } catch (error) {
            console.log(error)
            return {
                code: 500, message: "error"
            }
        }
    }

    const decreaseQty = (meal) => {

        if (meal.quantity > 1) {
            try {
                const updatedCartItems = cartItems.map((item) => item.id == meal.id ? { ...item, quantity: item.quantity - 1 } : { ...item })
                setData(updatedCartItems)
            } catch (error) {
                console.log(error)
                return {
                    code: 500, message: "error"
                }
            }
        }
        return;
    }

    const makePayment = async (payment_data) => {
       
        try {
                const response = await create_payment(payment_data);
                console.log(response)
                if (response.code == 201) {
                    showToast({
                    message: response.message,
                    type: "success",
                    })
                    setData([])
                    return {
                        code: response.code,
                        message: response.message
                    }
                }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <CartContext.Provider value={{
            cartItems,
            addToMyCart,
            removeFromMyCart,
            cartCounter,
            isAvailableInCart,
            getCartItems,
            decreaseQty,
            increaseQty,
            makePayment,
            loading,
            error,

        }}>
            {children}
        </CartContext.Provider>
    )
}

export { CartContext, CartProvider };

