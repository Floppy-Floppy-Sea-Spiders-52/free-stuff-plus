import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './components/App';
import AuthPage from './components/AuthPage';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


const projectName = 'Free Stuff!';

// document.getElementById('#title').innerHTML = projectName;
// document.getElementById('#h1').innerHTML = projectName;

const root = createRoot(document.getElementById('root'));

// set up routes to auth page and homepage
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<AuthPage />}/>
      <Route path="/home" element={<App />}/>
    </Routes>
  </BrowserRouter>
);


// AMG: added sample change here