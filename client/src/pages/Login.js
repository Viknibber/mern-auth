import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import useForm from '../hooks/useForm';
import Input from '../components/Input';
import Button from '../components/Button';

const Login = () => {
    const { login } = useContext(AuthContext);

    const { formData, errorData, onChange, onSubmit, handleErrors } = useForm(
        { email: '', password: '' },
        async () => await login(formData, handleErrors)
    );
    const { email, password } = formData;

    return (
        <div id='login-page'>
            <h1>Login</h1>
            <Input
                labelText='Email:'
                errorText={errorData.email}
                id='email'
                name='email'
                value={email}
                onChange={onChange}
            />
            <Input
                labelText='Password:'
                errorText={errorData.password}
                id='password'
                name='password'
                value={password}
                type='password'
                onChange={onChange}
                onKeyDown={onSubmit}
            />
            {errorData.server && <p style={{ color: 'red' }}>{errorData.server}</p>}
            <Button value='Login' onClick={onSubmit} />
        </div>
    );
};

export default Login;
