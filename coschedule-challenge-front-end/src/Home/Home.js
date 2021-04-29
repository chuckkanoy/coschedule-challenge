import './Home.css';
import React, {useEffect, useState} from 'react';
import {getTrendingGifs} from './../api.js';
import Card from './../Card/Card';

function Home({gifs}) {
  return (
    <div className="App">
      
      {gifs?.map(gif => {
        return <Card gif={gif}></Card>
      })}
    </div>
  );
}

export default Home;
