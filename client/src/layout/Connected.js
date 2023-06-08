import React from 'react';
import axios from '../lib/axios';
import Button from '../components/Button';

const Connected = () => {
    const onClick = async (e) => {
        e.preventDefault();
        const res = await axios.get('/api/connected');
        alert(res.data.msg);
    };

    return <Button onClick={(e) => onClick(e)} value='Test connection' />;
};

export default Connected;
