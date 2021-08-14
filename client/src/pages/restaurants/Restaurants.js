import { useState, useEffect } from 'react';
import axios from 'axios';

function Restaurants() {
  const [allRestaurants, setAllRestaurants] = useState([])

  useEffect(() => {
    const getRestaurants = async () => {
      const restaurants = await axios.get('/restaurants');
      setAllRestaurants(restaurants.data);
    }

    getRestaurants();
  }, []);

  return (
    <>
    <div>Restaurants</div>
    {
      allRestaurants.map((r) => (
        <p>{r.restaurant_name}</p>
      ))
    }
    </>
  )

}

export default Restaurants;