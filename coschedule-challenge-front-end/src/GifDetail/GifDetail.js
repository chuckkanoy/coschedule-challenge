import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import {getGif} from './../api';
import Card from '../Card/Card';
import './GifDetail.css';
import StarRatings from 'react-star-ratings';

export default function GifDetail() {
    const [gif, setGif] = useState([]);
    const [rating, setRating] = useState(0);
    
    let {id} = useParams();

    useEffect(() => {
        getGif(id).then(
          response => {
            setGif(response.data[0]);
            console.log(response.data[0]);
          }
        )
    }, []);

    const handleSubmit = () => {
        
    }

    const changeRating = (newRating) => {
        setRating(newRating);
    }

    return(
        <div className="detail">
            <h1>{gif.title}</h1>
            <img src={gif.images?.original.url} />
            <StarRatings 
                rating={rating}
                changeRating={changeRating}
                starRatedColor="blue"
                starHoverColor="blue"
                numberOfStars={5}
                name='rating'
            />
            {/* <form onSubmit={}>
                <textarea name="comment"></textarea>
            </form> */}
            
        </div>
    );
}