import './Rated.css';
import React, {useEffect, useState} from 'react';
import {getRatings} from './../api.js';
import Card from './../Card/Card';

function Rated() {
    const [ratings, setRatings] = useState([]);

    useEffect(() => {
        getRatings().then(
          response => {
            setRatings(response);
          }
        )
    }, []);

    return (
        <div className="App">
            {ratings.map(rating => {
                return <Card gif={rating.gif.data[0]} optionalRating={rating.rating}></Card>
            })}
        </div>
    );
}

export default Rated;
