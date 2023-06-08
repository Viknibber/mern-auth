import React from 'react';
import { Routes, Route } from 'react-router-dom';

import PrivateRoute from './hoc/PrivateRoute';
import PublicRoute from './hoc/PublicRoute';

import Layout from './layout/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

import './App.css';

const App = () => {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route exact strict index element={<Home />} />

                <Route element={<PublicRoute />}>
                    <Route exact strict path='login' element={<Login />} />
                    <Route exact strict path='register' element={<Register />} />
                </Route>

                <Route element={<PrivateRoute />}>
                    <Route exact strict path='profile' element={<Profile />} />
                </Route>
            </Route>
        </Routes>
    );
};

export default App;
