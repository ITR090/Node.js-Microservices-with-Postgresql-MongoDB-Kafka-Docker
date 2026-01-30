import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';

const RestaurantDetails = ({ meals }) => {

    const { addToMyCart } = useContext(CartContext);
    const [hoveredMealId, setHoveredMealId] = useState(null);

    const handleMouseEnter = (mealid) => {
        setHoveredMealId(mealid);
    };

    const handleMouseLeave = () => {
        setHoveredMealId(null);
    };

    const handleAddToCart = async (meal) => {
       await addToMyCart(meal)
    }

    // Group meals by their 'category' property
    const mealsByCategory = Object.groupBy(meals, ({ category }) => category);
    
    const MealList = Object.entries(mealsByCategory).map(([category, meals]) => (
        <div key={category}>
            <h2 className="text-2xl font-semibold my-4">{category}</h2>
            <div className="flex flex-col gap-4">
                {meals.map((meal) => (
                    <div key={meal.id} className="card card-side bg-base-100 shadow-sm">
                        <figure>
                            <img
                                src={meal.image_url}
                                alt="meal"
                                className='w-48 h-32'
                            />
                        </figure>
                        <div className="card-body p-3">
                            <h2 className="card-title">{meal.name}</h2>
                            <p>{meal.description}</p>
                            <div className="card-actions justify-end" onMouseEnter={() => handleMouseEnter(meal.id)} onMouseLeave={() => handleMouseLeave()}>
                                {!(hoveredMealId == meal.id) && <button className="btn btn-primary w-30">{meal.price}</button>}
                                {(hoveredMealId == meal.id) && <button className="btn btn-primary w-30" onClick={() => handleAddToCart(meal)}>Add to cart</button>}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    ));

    return (
        <>
            {MealList}
        </>
    );
}

export default RestaurantDetails;   