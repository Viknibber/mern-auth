import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import Loading from '../components/Loading';

const PrivateRoute = () => {
    const { isAuthenticated, isLoading } = useContext(AuthContext);

    if (isLoading) return <Loading />;
    if (isAuthenticated) return <Outlet />;
    return <Navigate to='/login' />;
};

export default PrivateRoute;
