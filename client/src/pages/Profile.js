import React from 'react';
import useFetch from '../hooks/useFetch';

const Profile = () => {
    const user = useFetch('/user');

    return (
        <div id='profile-page'>
            <h1>Profile</h1>
            {user && <p>Welcome {user.name}!</p>}
        </div>
    );
};

export default Profile;
