import React from 'react';
import { getFLocal } from '@/lib/allget';
import { getUserData } from '@/lib/crud';
import MyDonationRequestTable from '@/Components/myDonationRequestTable';

const MyDonationRequest = async() => {
    const userinfo = await getUserData()
    // console.log(userinfo)
    const role = userinfo?.role
    const data = await getFLocal(`/my-requests?Email=${userinfo?.email}`)
    console.log(data)
    return (
        <div className='min-h-screen w-11/12 mx-auto my-5'>
           <MyDonationRequestTable datas={data} role={role}></MyDonationRequestTable>
        </div>
    );
};

export default MyDonationRequest;