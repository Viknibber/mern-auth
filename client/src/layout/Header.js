import React from 'react';
import { NavLink } from 'react-router-dom';
import CheckAuth from './CheckAuth';

const Header = () => {
    return (
        <header id='header'>
            <nav>
                <ul>
                    <li>
                        <NavLink end to='/'>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink end to='/profile'>
                            Profile
                        </NavLink>
                    </li>
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
                    <li>
                        <CheckAuth />
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
