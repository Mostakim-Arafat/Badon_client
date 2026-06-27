import React from 'react';
import DonationRequestCard from '@/Components/B_Request_card';
import { getFLocal } from '@/lib/allget';

const Donation_Requests = async() => {
    const pendingDonation = await getFLocal('/donation_requests?donationStatus=pending') || [];
    
    return (
        <div className='min-h-screen w-full bg-rose-50/30 text-slate-800 py-12 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-7xl mx-auto'>
                <div className='text-center flex flex-col items-center gap-3 mb-12 border-b border-red-100 pb-8'>
                    <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center text-red-600 font-bold text-4xl shadow-sm animate-pulse">
                        🩸
                    </div>
                    <h1 className='text-3xl sm:text-4xl font-extrabold text-red-700 tracking-wide mt-2'>
                        Emergency Blood Requests
                    </h1>
                    <p className='text-base text-rose-500 font-medium max-w-md'>
                        Review the current active pending requests below. Your timely donation can save someone s life today.
                    </p>
                </div>

                {pendingDonation.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-center p-12 bg-white rounded-2xl border border-red-50 shadow-sm max-w-md mx-auto mt-8">
                        <span className="text-5xl mb-4">🎉</span>
                        <h3 className="text-xl font-bold text-slate-700">No Pending Requests</h3>
                        <p className="text-sm text-slate-400 mt-1">All patient needs are currently fulfilled. Check back later!</p>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6'>
                        {pendingDonation.map(item => (
                            <div key={item._id || item.id} className="transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl rounded-2xl">
                                <DonationRequestCard request={item} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Donation_Requests;