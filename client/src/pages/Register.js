import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import useForm from '../hooks/useForm';
import Input from '../components/Input';
import Button from '../components/Button';

const Register = () => {
    const { register } = useContext(AuthContext);

    const { formData, errorData, onChange, onSubmit, handleErrors } = useForm(
        { name: '', email: '', password: '', password2: '' },
        async () => await register(formData, handleErrors)
    );
    const { name, email, password, password2 } = formData;

    return (
        <div id='register-page'>
            <h1>Register</h1>
            <Input
                labelText='Name:'
                errorText={errorData.name}
                id='name'
                name='name'
                value={name}
                onChange={onChange}
            />
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
            />
            <Input
                labelText='Confirm password:'
                errorText={errorData.password2}
                id='password2'
                name='password2'
                value={password2}
                type='password'
                onChange={onChange}
                onKeyDown={onSubmit}
            />
            {errorData.server && <p style={{ color: 'red' }}>{errorData.server}</p>}
            <Button value='Register' onClick={onSubmit} />
        </div>
    );
};

export default Register;
