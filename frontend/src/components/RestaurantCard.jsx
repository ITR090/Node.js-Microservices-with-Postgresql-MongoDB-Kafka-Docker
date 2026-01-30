import React from 'react';
import { Link } from 'react-router-dom';
// components
import DaisyHalfRating from './UI/DaisyHalfRating';

const RestaurantCard = ({ restaurant }) => {

    return (
        <Link to={`/restaurant/${restaurant.id}`} state={{ dataResponse: restaurant }}>
            <ul className="list bg-base-100 rounded-box shadow-md">
                <li className="list-row">
                    <div><img className="size-20 rounded-box" src={restaurant.logo_url} /></div>
                    <div>
                        <div>{restaurant.name}</div> 
                        <div className="text-xs uppercase font-semibold opacity-60">Delivery time:{restaurant.delivery_time_min}</div>
                        <DaisyHalfRating rating={restaurant.rating} />
                    </div>
                </li>
            </ul>
        </Link>
    );
}

export default RestaurantCard;
