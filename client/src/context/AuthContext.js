import React, { createContext, useEffect, useCallback, useReducer } from 'react';
import axios from '../lib/axios';

const AuthContext = createContext({});

const AuthReducer = (state, { type }) => {
    switch (type) {
        case 'REFRESH_SUCCESS':
        case 'LOGIN_SUCCESS':
        case 'REGISTER_SUCCESS':
            return { ...state, isAuthenticated: true, isLoading: false };
        case 'REFRESH_FAILED':
        case 'LOGIN_FAILED':
        case 'REGISTER_FAILED':
            return { ...state, isAuthenticated: false, isLoading: false };
        case 'START_LOADING':
            return { ...state, isLoading: true };
        default:
            return state;
    }
};

export const AuthProvider = ({ children }) => {
    const [{ isAuthenticated, isLoading }, dispatch] = useReducer(AuthReducer, {
        isAuthenticated: false,
        isLoading: true,
    });

    const refresh = useCallback(async () => {
        try {
            await axios.get('/api/auth');
            dispatch({ type: 'REFRESH_SUCCESS' });
        } catch {
            dispatch({ type: 'REFRESH_FAILED' });
        }
    }, []);
    useEffect(() => {
        refresh();
    }, [refresh]);

    useEffect(() => {
        const resInterceptor = axios.interceptors.response.use(
            (res) => res,
            async (err) => {
                if (err.response?.status === 403 && !err.response.data?.msg === 'refreshFailed') {
                    await refresh();
                    return axios(err.config);
                }

                return Promise.reject(err);
            }
        );

        return () => axios.interceptors.response.eject(resInterceptor);
    }, [refresh]);

    const login = async (loginData, handleErrors) => {
        dispatch({ type: 'START_LOADING' });

        try {
            await axios.post('/api/auth/login', loginData);
            dispatch({ type: 'LOGIN_SUCCESS' });
        } catch (err) {
            dispatch({ type: 'LOGIN_FAILED' });
            handleErrors(err);
        }
    };

    const register = async (registerData, handleErrors) => {
        dispatch({ type: 'START_LOADING' });

        try {
            await axios.post('/api/auth/register', registerData);
            dispatch({ type: 'REGISTER_SUCCESS' });
        } catch (err) {
            dispatch({ type: 'REGISTER_FAILED' });
            handleErrors(err);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, login, register }}>{children}</AuthContext.Provider>
    );
};

export default AuthContext;
