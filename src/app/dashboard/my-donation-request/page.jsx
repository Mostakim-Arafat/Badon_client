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
        <div>
            my donation requenst
           <MyDonationRequestTable datas={data} role={role}></MyDonationRequestTable>
        </div>
    );
};

export default MyDonationRequest;