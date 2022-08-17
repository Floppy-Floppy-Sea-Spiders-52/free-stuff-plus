import React from 'react';
import Sidebar from './Sidebar';
import './app.scss';
import PostsContainer from './PostsContainer';
import AuthPage from './AuthPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Render: header/nav bar, sidebar component, posts container component, 
  // footer

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />}/>
        <Route path="home" element={
          <div className='App'>
            <div className="App__header">free stuff</div>
            <div className="App__content">
              <Sidebar/>
              <PostsContainer/>
            </div>
            <div className="App__footer">
            </div>
          </div>
        }/>
      </Routes>
    </BrowserRouter>
  );
}


export default App;
