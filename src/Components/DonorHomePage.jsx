'use client';

import { useEffect, useState } from 'react';
import MyDonationRequestTable from './myDonationRequestTable';
import { getFLocal } from '@/lib/allget';
import { redirect } from 'next/navigation';

const DonorHomePage = ({ userinfo }) => {
    const [data, setData] = useState([]);

    useEffect(() => {

        const loadRequests = async () => {
            const fulldatas = await getFLocal(`/my-requests?Email=${userinfo.email}`);
           
                setData(fulldatas.slice(0, 3));
          
        };

        loadRequests();
    }, [userinfo?.email]);

    return (
        <div className="w-full flex flex-col gap-6 mx-auto my-5 p-1 max-w-7xl">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-700 via-red-600 to-rose-600 text-white shadow-xl shadow-red-100 p-6 md:p-8 border border-red-500/10">
                <div className="absolute top-[-20%] right-[-10%] w-72 h-72 rounded-full bg-white/5 blur-2xl pointer-events-none"></div>
                <div className="absolute bottom-[-30%] left-[-5%] w-60 h-60 rounded-full bg-rose-500/20 blur-xl pointer-events-none"></div>
                
                <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white text-3xl shadow-inner border border-white/20 animate-pulse">
                            🩸
                        </div>
                        <div>
                            <span className="bg-white/20 text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md backdrop-blur-md border border-white/10">
                                Blood Hero Portal
                            </span>
                            <h1 className="text-2xl md:text-3xl font-black tracking-wide uppercase mt-1.5 drop-shadow-sm">
                                Welcome Back, {userinfo?.name || "Donor"}
                            </h1>
                            <p className="text-rose-100 text-xs md:text-sm font-medium mt-0.5 max-w-xl opacity-90">
                                Every drop you orchestrate saves up to three lives. Thank you for standing strong as a vital lifeline in our registry.
                            </p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-3 bg-black/10 backdrop-blur-md border border-white/10 p-3 rounded-2xl self-start md:self-center shadow-md">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></div>
                        <div className="text-left pr-4">
                            <p className="text-[10px] text-rose-200 font-extrabold uppercase tracking-wider leading-none">Security Token</p>
                            <p className="text-xs font-black uppercase tracking-wide text-white mt-1">{userinfo?.role}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-red-100/60 shadow-xl shadow-slate-100/50 p-5 md:p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-50 pb-4">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-5 rounded-full bg-red-600"></div>
                        <h2 className="text-sm font-black tracking-wider text-slate-700 uppercase">
                            Recent Donation Pipelines (Latest 3 Activities)
                        </h2>
                    </div>
                    <button 
                        className="btn btn-sm px-5 bg-rose-50 hover:bg-rose-100/80 border border-rose-200 hover:border-rose-300 text-red-600 font-black rounded-xl transition-all active:scale-95 cursor-pointer text-xs uppercase tracking-wider shadow-sm flex items-center gap-2 h-9" 
                        onClick={() => redirect('/dashboard/my-donation-request')}
                    >
                        <span>📋</span> View Full Registry
                    </button>
                </div>
                
                <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-inner bg-slate-50/20">
                    <MyDonationRequestTable datas={data} role={userinfo?.role} />
                </div>
            </div>
        </div>
    );
};

export default DonorHomePage;