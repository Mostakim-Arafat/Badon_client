import React from 'react';
import { getFLocalServer, getUserData } from '@/lib/crud';
import MyDonationRequestTable from '@/Components/myDonationRequestTable';

export const dynamic = 'force-dynamic';

const MyDonationRequest = async() => {
    const userinfo = await getUserData()
    // console.log(userinfo)
    const role = userinfo?.role
    const data = await getFLocalServer(`/my-requests?Email=${userinfo?.email}`)
    return (
        <div className='min-h-screen w-11/12 mx-auto my-5'>
           <MyDonationRequestTable datas={data} role={role}></MyDonationRequestTable>
        </div>
    );
};

export default MyDonationRequest;