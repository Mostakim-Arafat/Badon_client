import React from 'react';
import DonationRequestCard from '@/Components/B_Request_card';
import { getFLocal } from '@/lib/allget';
const Donation_Requests = async() => {
    const pendingDonation = await getFLocal('/donation_requests?donationStatus=pending')
    console.log(pendingDonation)
    return (
        <div className='min-h-screen w-11/12 mx-auto'>
            donations
            <div className='grid grid-cols-1 lg:grid-cols-3'>
                {
                pendingDonation.map( item => (
                     <DonationRequestCard key={item._id} request={item} ></DonationRequestCard>
                ))
            }
            </div>
            
           
        </div>
    );
};

export default Donation_Requests;