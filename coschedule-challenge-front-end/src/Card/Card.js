import './Card.css';
import {Link, useHistory, useLocation} from 'react-router-dom';

export default function Card({gif, optionalRating}) {
    let history = useHistory();
    let location = useLocation();

    return (
        location.pathname === '/ratings' ?
            <div className="card">
                <Link to={`/gif/${gif.id}/rating/${optionalRating}`} >
                    <header>{gif.title}</header>
                    <img src={gif.images?.preview_gif.url}/>
                </Link>
            </div>
            :
            <div className="card">
                <Link to={`/gif/${gif.id}`} >
                    <header>{gif.title}</header>
                    <img src={gif.images?.preview_gif.url}/>
                </Link>
            </div>
    );
}