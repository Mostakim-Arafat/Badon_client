import React from 'react';
import DonationRequestDetails from '@/Components/RequestDetailCard';
import { getFLocal } from '@/lib/allget';

const RequestDetails = async({params}) => {
    const {id} = await params
    const data = await getFLocal(`/donation_requests/${id}`)
    return (
        <div>
            donation details
            <DonationRequestDetails request={data}></DonationRequestDetails>
        </div>
    );
};

export default RequestDetails;