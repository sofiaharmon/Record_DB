import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import MainSearch from './components/MainSearch';
import SearchResCell from './components/SearchResCell';
import SideMenu from './components/SideMenu';
import TopHeader from './components/TopHeader';
import SearchPage from './pages/SearchPage';
import Register from './components/Register'
import UsersPage from './pages/UsersPage';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <TopHeader/>]
      <Routes>
        <Route exact path='/' element={<SearchPage />} />
        <Route path='/register' element={<UsersPage/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </Router>
  );
}

export default App;
