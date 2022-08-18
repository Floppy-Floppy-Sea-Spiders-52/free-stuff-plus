import React, { Component, useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import './app.scss';
import PostsContainer from './PostsContainer';
import NavBar from './NavBar'

// Render: header/nav bar, sidebar component, posts container component, 
  // footer

function App() {
  const [ itemCardCounter, setItemCardCounter ] = useState(0);
  // useEffect(() => {
  //   const incrementCounter = async (data) => {
  //     await setItemData(data);
  //   }
  // })
  const incrementCounter = () => {
    console.log('imported data :', data);
    setItemCardCounter(itemCardCounter + 1);
  }
    return (
    <div>
      <div className='App'>
        <div className="App__header">free stuff</div>
        <NavBar incrementCounter={incrementCounter} />
        <div className="App__content">
          <Sidebar/>
          <PostsContainer />
        </div>
        <div className="App__footer">
        </div>
      </div>
    </div>
    );
}


export default App;
