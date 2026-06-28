import React from 'react';
import AlluserTable from '@/Components/AlluserTable';
import { getFLocalServer } from '@/lib/crud';

export const dynamic = 'force-dynamic';
const AllUsers = async() => {
    const users = await getFLocalServer('/users')
    return (
        <div className="bg-white rounded-2xl border border-red-50 shadow-sm overflow-hidden">
            <AlluserTable users={users}></AlluserTable>
        </div>
    );
};

export default AllUsers;