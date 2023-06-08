import React from 'react';
import axios from '../lib/axios';
import Button from '../components/Button';

const CheckAuth = () => {
    const onClick = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.get('/api/auth');
            alert(res.data.msg);
        } catch (err) {
            alert(err.response.data.msg);
        }
    };

    return <Button onClick={(e) => onClick(e)} value='Check authentication' />;
};

export default CheckAuth;
