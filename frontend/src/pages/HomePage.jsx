import React, {useState,useEffect} from 'react'
// libs
import Body from '../components/UI/Body';
import Loader from '../components/UI/Loader';
import RestaurantCard from '../components/RestaurantCard';
import { getRestaurants } from '../services/ApiService';
import useFetch from '../hooks/useFetch';

const HomePage = () => {


  const { data: restaurants, loading, error } = useFetch(getRestaurants);

  if (loading) {
    return <Loader fullScreen text="Fetching data..."/>
  }

  return (
    <Body>
      <h1 className="text-2xl font-bold mb-6">Restaurants</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        
        {restaurants?.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
          />
        ))}
      </div>
    </Body>
  )
}

export default HomePage