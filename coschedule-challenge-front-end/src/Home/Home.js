import './Home.css';
import React from 'react';
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
