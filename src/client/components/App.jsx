import React, { useState, useEffect } from 'react';
import './app.scss';
import Sidebar from './Sidebar';
import PostsContainer from './PostsContainer';

const App = () => {
  const [postsArray, setPostsArray] = useState([]);
  const [filters, setFilters] = useState([]);

  // moved DB call for all items here so we can pass props to each child component as needed
  useEffect(() => {
    const getData = async () => {
      const result = await fetch('/api');
      const data = await result.json();
      await setPostsArray(data);
      await setFilters(data.map(post => post.tag));
    };
    getData();
  }, []);

  return (
    <div className='App'>
      <div className="App__header">free stuff</div>
      <div className="App__content">
        <Sidebar filters={filters}/>
        <PostsContainer postsArray={postsArray}/>
      </div>
      <div className="App__footer">
      </div>
    </div>
  );
}

export default App;
