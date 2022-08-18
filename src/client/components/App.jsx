import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './app.scss';
import Sidebar from './Sidebar';
import PostsContainer from './PostsContainer';

const App = () => {
  const [postsArray, setPostsArray] = useState([]);
  const [filters, setFilters] = useState([]);
  const [claimedCount, setClaimedCount] = useState(0);

  // save email of logged in user for future requests
  const location = useLocation();
  const email = location.state.username;

  // moved DB call for all items here so we can pass props to each child component as needed
  // will trigger re-render on item addition & item being claimed
  useEffect(() => {
    const getData = async () => {
      const result = await fetch('/api');
      const data = await result.json();
      await setPostsArray(data);
      // await setFilters(data.map(post => post.tag));
      // need backend revision so that each 'get' to '/' also gives list of tags on the returned items
      // this is b/c tags do not live on items table 
    };
    getData();
  }, [claimedCount]);

  // increment number of items user has claimed in order to re-render page & remove claimed item card
  // could be used in future to add user-related functionality 
  // (e.g a user account page with history and stats)
  const incrementClaimedCount = () => {
    setClaimedCount(claimedCount + 1);
  }

  // sidebar makes BE request for items by tag; 
  // update state & pass as props to postscontainer: should cause re-render!
  const setPosts = (filteredData) => {
    setPostsArray(filteredData);
  };

  // also, add items will need BE call to update DB -- doing it in navbar? will need to pass user email tho
  // and then call BE to update all posts again in case of other users posting.

  return (
    <div className='App'>
      <div className="App__header">free stuff</div>
      <div className="App__content">
        <Sidebar filters={filters} setPosts={setPosts}/>
        <PostsContainer postsArray={postsArray} incrementClaimedCount={incrementClaimedCount}/>
      </div>
      <div className="App__footer">
      </div>
    </div>
  );
};

export default App;
