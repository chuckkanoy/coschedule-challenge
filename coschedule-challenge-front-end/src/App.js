import React, {useEffect, useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Home from './Home/Home';
import GifDetail from './GifDetail/GifDetail';
import {getTrendingGifs, searchGifs} from './api.js';
import Header from './Header/Header';
import Rated from './Rated/Rated';
import Login from './Registration/Login';
import Register from './Registration/Register';

function App() {
  const [gifs, setGifs] = useState([]);
  const [offset, setOffset] = useState(0);
  const [maxOffset, setMaxOffset] = useState(0);
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    console.log(offset);
    search ? 
    searchGifs(search, offset).then(
      response => {
        setGifs(response.data);
        setMaxOffset(response.pagination.total_count);
        setCount(response.pagination.count);
      }
    ):
    getTrendingGifs(offset).then(
      response => {
        setGifs(response.data);
        setMaxOffset(response.pagination.total_count);
        setCount(response.pagination.count);
      }
    )
  }, [search, offset]);

  const searchForTerm = (event) => {
    setSearch(event.target.value);
    setOffset(0);
    setPage(0);
  }

  const movePageLeft = () => {
    if(offset - count >= 0) {
      setOffset(offset - count);
      setPage(page - 1);
    } else {
      setOffset(0);
      setPage(0);
    }
  }

  const movePageRight = () => {
    if(offset + count <= maxOffset) {
      setOffset(offset + count);
    } else {
      setOffset(maxOffset - 1);
      setPage(offset / count);
    }
  }

  return (
    <Router>
      <Switch>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/ratings">
          <Header movePageLeft={movePageLeft} movePageRight={movePageRight} searchForTerm={searchForTerm}/>
          <Rated />
        </Route>
        <Route path="/gif/:id/rating/:ratingParam">
          <Header movePageLeft={movePageLeft} movePageRight={movePageRight} searchForTerm={searchForTerm}/>
          <GifDetail />
        </Route>
        <Route path="/gif/:id">
          <Header movePageLeft={movePageLeft} movePageRight={movePageRight} searchForTerm={searchForTerm}/>
          <GifDetail />
        </Route>
        <Route path="/">
          <Header movePageLeft={movePageLeft} movePageRight={movePageRight} searchForTerm={searchForTerm}/>
          <Home gifs={gifs}/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
