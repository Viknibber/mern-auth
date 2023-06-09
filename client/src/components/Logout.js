import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import Button from './Button';

const Logout = () => {
    const { logout } = useContext(AuthContext);

    const onClick = (e) => {
        e.preventDefault();
        logout();
    };

    return <Button value='Logout' onClick={(e) => onClick(e)} />;
};

export default Logout;
