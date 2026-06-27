import React from 'react';
import AlluserTable from '@/Components/AlluserTable';
import { getFLocal } from '@/lib/allget';

const AllUsers = async() => {
    const users = await getFLocal('/users')
    return (
        <div>
            all users
            <AlluserTable users={users}></AlluserTable>
        </div>
    );
};

export default AllUsers;