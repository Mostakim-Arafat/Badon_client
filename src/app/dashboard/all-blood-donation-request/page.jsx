import React from 'react';
import MyDonationRequestTable from '@/Components/myDonationRequestTable';
import { getFLocalServer, getUserData } from '@/lib/crud';
export const dynamic = 'force-dynamic';
const AllRequests = async() => {
    const data = await getFLocalServer('/donation_requests')
    const userinfo = await getUserData()
    const role = userinfo?.role
    return (
        <div>
            <MyDonationRequestTable datas={data} role={role}></MyDonationRequestTable>

        </div>
    );
};

export default AllRequests;