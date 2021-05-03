import giphylogo from './giphylogo.svg'
import './Header.css'

import IconButton from '@material-ui/core/IconButton/IconButton';
import ChevronRight from '@material-ui/icons/ChevronRight';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import {Link, useHistory, useLocation} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUser } from '../api';

function Header({movePageLeft, movePageRight, searchForTerm, user}) {
    const [currentUser, setCurrentUser] = useState([]);
    
    localStorage.setItem('previousPage', useLocation().pathname);
    let history = useHistory();

    useEffect(() => {
        getUser().then(
            response => {
                setCurrentUser(response);
            }
        )
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        
        history.push('/');
        window.location.reload();
    }

    const login = () => {
        if(localStorage.getItem('token'))
            return <Link onClick={handleLogout}>Logout</Link>
        else
            return <Link to="/login">Login</Link>
    }

    const searchBar = useLocation().pathname === "/" ?
        <input type="text" placeholder="Search" onChange={searchForTerm}/> :
        "";

    const ratedOption = currentUser?._id ? 
    <li>
        <Link to="/ratings">Rated</Link>
    </li> :
    ""; 

    return (
        <div className="header-container">
            <header className="App-header">
                <IconButton className="leftButton" onClick={movePageLeft}>
                    <ChevronLeft />
                </IconButton>
                <a href="https://developers.giphy.com/">
                    <img className="logo" src={giphylogo} alt="GIPHY logo"></img>
                </a>
                GIF Rater
                <IconButton className="rightButton" onClick={movePageRight}>
                    <ChevronRight/>
                </IconButton>
                {searchBar}
            </header>
            <div className="link-bar">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    {ratedOption}
                    <li className="login">
                        {login()}
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Header;