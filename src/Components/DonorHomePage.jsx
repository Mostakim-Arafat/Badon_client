import React from 'react';

const DonorHomePage = ({userinfo}) => {
  
    return (
        <div>
            <h1>Welcome {userinfo?.name}</h1>
        </div>
    );
};

export default DonorHomePage;