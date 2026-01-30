import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from "react-router";
//libs
import Body from '../components/UI/Body';
import Loader from '../components/UI/Loader';
import RestaurantDetails from '../components/RestaurantDetails';
import useFetch from '../hooks/useFetch';
import { getRestaurantDetails } from '../services/ApiService';

const RestaurantDetailsPage = () => {

    let params = useParams();
    const location = useLocation();
    const restaurant = location.state?.dataResponse;

    const { data: restaurantMeals, loading, error } = useFetch(() => getRestaurantDetails(params.id));

    if (loading) {
        return <Loader fullScreen text="Fetching data..." />
    }

    if (error) {
        console.log(error)
    }

    return (
        <Body>
            <h1 className="text-3xl font-bold mb-4">{restaurant.name}</h1>

            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
                {restaurantMeals && <RestaurantDetails meals={restaurantMeals} />}
            </div>
        </Body>
    );
}

export default RestaurantDetailsPage;