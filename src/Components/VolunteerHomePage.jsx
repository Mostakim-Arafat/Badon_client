import React from 'react';

const VolunteerHomePage = ({userinfo}) => {
    return (
        <div>
             <h1>Welcome {userinfo.name}</h1>
        </div>
    );
};

export default VolunteerHomePage;