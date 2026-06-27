import React from 'react';
import DonationRequestDetails from '@/Components/RequestDetailCard';
import { getFLocal } from '@/lib/allget';

const RequestDetails = async({params}) => {
    const {id} = await params
    const data = await getFLocal(`/donation_requests/${id}`)
    
    return (
        <div className="min-h-screen w-full bg-rose-50/30 text-slate-800 p-4 flex items-center justify-center">
            <div className="w-full max-w-4xl bg-white border border-red-100 rounded-2xl shadow-xl p-6 md:p-8 flex flex-col gap-6 mx-auto my-auto">
                <div className="flex flex-col sm:flex-row items-center gap-4 border-b border-red-50 pb-6 w-full text-center sm:text-left justify-center sm:justify-start">
                    <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center text-red-600 font-bold text-4xl shadow-sm">
                        📋
                    </div>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-red-700 tracking-wide">
                            Request Specification Details
                        </h1>
                        <p className="text-sm text-rose-500 font-medium mt-1">
                            Review emergency contact data, timeline, and hospital address below.
                        </p>
                    </div>
                </div>

                <div className="w-full bg-slate-50/50 p-2 sm:p-4 rounded-xl border border-slate-100 flex justify-center">
                    <div className="w-full flex justify-center">
                        <DonationRequestDetails request={data} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RequestDetails;