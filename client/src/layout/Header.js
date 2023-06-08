import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Header = () => {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <header id='header'>
            <nav>
                <ul>
                    <li>
                        <NavLink end to='/'>
                            Home
                        </NavLink>
                    </li>
                    {isAuthenticated && (
                        <li>
                            <NavLink end to='/profile'>
                                Profile
                            </NavLink>
                        </li>
                    )}
                    {!isAuthenticated && (
                        <>
                            <li>
                                <NavLink end to='/login'>
                                    Login
                                </NavLink>
                            </li>
                            <li>
                                <NavLink end to='/register'>
                                    Register
                                </NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
