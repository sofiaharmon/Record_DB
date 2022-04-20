import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import TopHeader from './components/TopHeader';
import SearchPage from './pages/SearchPage';
import UsersPage from './pages/UsersPage';
import Login from './pages/Login';
import AddRecord from './pages/AddRecord';
import Distributors from './pages/Distributors';
import BottomBar from './components/BottomBar';

function App() {
  return (
    <Router>
      <TopHeader />
      <Routes>
        <Route exact path='/' element={<SearchPage />} />
        <Route path='/register' element={<UsersPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/addrecord' element={<AddRecord />} />
        <Route path='/distributors' element={<Distributors />} />
      </Routes>
      <BottomBar />
    </Router>
  );
}

export default App;
