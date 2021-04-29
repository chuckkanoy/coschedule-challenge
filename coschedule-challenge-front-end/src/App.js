import logo from './logo.svg';
import React, {useEffect, useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from 'react-router-dom';
import {browserHistory} from 'react-router';
import Home from './Home/Home';
import GifDetail from './GifDetail/GifDetail';
import {getTrendingGifs, searchGifs} from './api.js';
import Header from './Header/Header';

function App() {
  const [gifs, setGifs] = useState([]);
  const [page, setPage] = useState(0);
  const [pageMax, setPageMax] = useState([]);
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    search ? 
    searchGifs(search).then(
      response => {
        setGifs(response.data);
        setPageMax(response.pagination.total_count);
        setCount(response.pagination.count);
      }
    ):
    getTrendingGifs(page).then(
      response => {
        setGifs(response.data);
        setPageMax(response.pagination?.total_count);
        setCount(response.pagination?.count);
      }
    )
  }, [search, page]);

  const searchForTerm = (event) => {
    setSearch(event.target.value);
  }

  const movePageLeft = () => {
    if(page - count >= 0) {
      setPage(page - count);
    }
  }

  const movePageRight = () => {
    if(page + count <= pageMax) {
      setPage(page + count);
    }
  }

  return (
    <Router>
      <Header movePageLeft={movePageLeft} movePageRight={movePageRight} searchForTerm={searchForTerm}/>
      <Switch>
        {/* <Route path="/ratings">
          <GifDetail />
        </Route> */}
        <Route path="/gif/:id">
          <GifDetail />
        </Route>
        <Route path="/">
          <Home gifs={gifs}/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
