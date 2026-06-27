import React from 'react';
import MyDonationRequestTable from '@/Components/myDonationRequestTable';
import { getFLocal } from '@/lib/allget';
import { getUserData } from '@/lib/crud';
const AllRequests = async() => {
    const data = await getFLocal('/donation_requests')
    const userinfo = await getUserData()
    const role = userinfo?.role
    return (
        <div>
            <MyDonationRequestTable datas={data} role={role}></MyDonationRequestTable>

        </div>
    );
};

export default AllRequests;