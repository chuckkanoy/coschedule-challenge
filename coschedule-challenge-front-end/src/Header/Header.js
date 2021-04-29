import giphylogo from './giphylogo.svg'
import './Header.css'

import IconButton from '@material-ui/core/IconButton/IconButton';
import ChevronRight from '@material-ui/icons/ChevronRight';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import {Link} from 'react-router-dom';

function Header({movePageLeft, movePageRight, searchForTerm}) {

    return (
        <div className="header-container">
            <header className="App-header">
                <IconButton className="leftButton" onClick={movePageLeft}>
                    <ChevronLeft />
                </IconButton>
                <a href="https://developers.giphy.com/">
                    <img className="logo" src={giphylogo}></img>
                </a>
                GIF Rater
                <IconButton className="rightButton" onClick={movePageRight}>
                    <ChevronRight/>
                </IconButton>
                <input type="text" placeholder="Search" onChange={searchForTerm}/>
            </header>
            <div className="link-bar">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/ratings">Rated</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Header;