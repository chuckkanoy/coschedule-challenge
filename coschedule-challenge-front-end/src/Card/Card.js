import './Card.css';
import {Link} from 'react-router-dom';

export default function Card({gif}) {
    return (
            <div className="card">
                <Link to={`/gif/${gif.id}`}>
                    <header>{gif.title}</header>
                    <img src={gif.images?.preview_gif.url}/>
                </Link>
            </div>
    );
}