import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import Loading from '../components/Loading';

const PublicRoute = () => {
    const { isAuthenticated, isLoading } = useContext(AuthContext);

    if (isLoading) return <Loading />;
    if (!isAuthenticated) return <Outlet />;
    return <Navigate to='/' />;
};

export default PublicRoute;
