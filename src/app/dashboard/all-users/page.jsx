import React from 'react';
import AlluserTable from '@/Components/AlluserTable';
import { getFLocal } from '@/lib/allget';

const AllUsers = async() => {
    const users = await getFLocal('/users')
    return (
        <div className="bg-white rounded-2xl border border-red-50 shadow-sm overflow-hidden">
            <AlluserTable users={users}></AlluserTable>
        </div>
    );
};

export default AllUsers;