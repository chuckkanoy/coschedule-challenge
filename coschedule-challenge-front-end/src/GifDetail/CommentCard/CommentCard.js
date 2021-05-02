import { IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React from 'react';
import { deleteComment } from '../../api';
import './CommentCard.css';

export default function CommentCard({comment, user, setModified, modified}) {
    const handleDelete = () => {
        deleteComment(comment._id).then(
            response => {
                console.log(response);
            }
        )
        setModified(!modified);
    }

    const commentCard = () => {
        const defaultDisplay = 
            <div>
                <p>{comment.comment}</p>
                <hr />
                <p>{comment.user?.username}</p>
                <p>{comment.createdDate}</p>
            </div>

        console.log(comment);
        return user._id ? 
            user.username === comment.user?.username ?
                <div className="commentCardWrapper">
                    {defaultDisplay}
                    <div className="loggedInOptions">
                        <IconButton onClick={handleDelete}>
                            <Delete/>
                        </IconButton>
                    </div>
                </div>
                :
                <div className="commentCardWrapper">
                    {defaultDisplay}
                </div>
            
         : 
            <div className="commentCardWrapper">
                {defaultDisplay}
            </div>
            
        
    }

    return (
        <div className="commentCardWrapper">
            {commentCard()}
        </div>
    );
}