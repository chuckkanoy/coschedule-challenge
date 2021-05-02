import React, { useState, useEffect } from 'react';
import { useParams, useHistory} from 'react-router-dom';
import {getGif, createRating, getComments, createComment, getUser} from './../api';
import './GifDetail.css';
import StarRatings from 'react-star-ratings';
import CommentCard from './CommentCard/CommentCard';

export default function GifDetail() {
    const [gif, setGif] = useState([]);
    const [comments, setComments] = useState([]);
    const [rating, setRating] = useState(0);
    const [modified, setModified] = useState(false);
    const [user, setUser] = useState([]);
    
    let {id, ratingParam} = useParams();
    let history = useHistory();

    useEffect(() => {
        getGif(id).then(
          response => {
            setGif(response.data[0]);
          }
        );
        getComments(id).then(
            response => {
                setComments(response);
            }
        );

        ratingParam ? setRating(Number(ratingParam)) : setRating(rating);
    }, [modified, id, rating, ratingParam]);

    useEffect(() => {
        getUser().then(
            response => {
                response.username ? 
                    setUser(response) :
                    setUser([]);
            }
        )
    }, []);

    const changeRating = (newRating) => {
        if(user._id) {
            setRating(newRating);
            createRating(gif.id, newRating);
        } else {
            history.push('/login');
        }
    }

    const addComment = async () => {
        let comment = document.getElementById('comment').value;

        await createComment(id, comment).then(
            response => {
                response.message ? 
                history.push('/login') : 
                console.log(response)          
            }
        );

        setModified(!modified);
    }

    const commentForm = () => {
        return (
            <div className="commentForm">
                <textarea id='comment'/>
                <button onClick={addComment}>Comment!</button>
            </div>
        );
    }

    return(
        <div className="detailWrapper">
            <div>
                <div className="detail">
                    <h1>{gif.title}</h1>
                    <img src={gif.images?.original.url} alt="GIF selected" />
                </div>
            </div>
            <div className="commentary">
                <div className="stars">
                    <StarRatings 
                        rating={rating}
                        changeRating={changeRating}
                        starRatedColor="darkgoldenrod"
                        starHoverColor="gold"
                        numberOfStars={5}
                        name='rating'
                    />
                </div>
                {localStorage.getItem('token') ? 
                    commentForm() :
                    <p className="notLoggedIn">Please log in to comment on this GIF</p>
                }
                {comments.map(comment => 
                        <CommentCard comment={comment} user={user} setModified={setModified} modified={modified}/>
                )}
            </div>
        </div>
    );
}