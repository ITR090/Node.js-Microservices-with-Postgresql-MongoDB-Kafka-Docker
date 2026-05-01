// Client APIs
import api from "../utilities/axios";


// Restaurant APIs
export const getRestaurants = async () => {
    try {
        const response = await api.get('/restaurants');
        console.log(response)
        if (response.status == 200) {
            return response.data;
        }
    } catch (error) {
        console.error('Error fetching restaurants:', error);
        return {
            error: error.message
        }
    }
};

export const getRestaurantDetails = async (id) => {
    try {
        const response = await api.get(`/restaurants/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching restaurant details:', error);
    }
}

// Cart APIs
export const getCartItems = async () => {
    try {
        const response = await api.get('/cart');
        return response.data;
    } catch (error) {
        console.error('Error fetching cart items:', error);
    }
};

export const addToCart = async (meal) => {

    try {

        const response = await api.post('/cart/add', meal);
        console.log(response)
        if (response.status === 201) {
            return {
                data: response.data.cartItem,
                message: response.data.message
            }
        }

    } catch (error) {

        if (error.status == 400) {
            // already in cart
            return {
                code: 400, message: error.response.data.message
            }
        }

        if (error.status == 500) {
            console.error('Server error while adding to cart:', error);
            return {
                code: 500, message: error.response.data.message
            }
        }

    }
};

export const removeFromCart = async (id) => {
    try {
        const response = await api.post('/cart/remove', { id });
        if (response.status === 200) {
            return response;
        }
    } catch (error) {

        if (error.status == 500) {
            return {
                code: 500, message: 'Server error'
            }
        }
    }
};

export const clearCart = async () => {

    try {
        const response = await api.post('/cart/clear-cart')
        if (response.status == 200) {
            return {
                code: 200
            }
        }
    } catch (error) {
        console.log(error)
        if (error.status == 500) {
            console.error('Server error while adding to cart:', error);
            return {
                code: 500, message: error.response.data.message
            }
        }
    }
}


// Payment APIs
export const create_payment = async (payment_data) => {

    try {
        const response = await api.post("/payment/create",  payment_data)
        if (response.status == 201) {
            const clearCart_response = await clearCart()
            if (clearCart_response.code == 200) {
                return {
                    code: 201, message: response.data.message
                }
            }
        }
    } catch (error) {
        console.log(error)
        return {
            code: 500, //message: error.response.data.message
        }

    }
}

// Orders APIs
export const getOrders = async () => {
    try {
        const response = await api.get('orders/get-orders');
        console.log(response)     
        if (response.status == 200) {
            return response.data;
        }
    } catch (error) {
        console.error('Error fetching orders:', error);
        return {    
            error: error.message
        }
    }   
}


