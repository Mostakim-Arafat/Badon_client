'use client';

import { getFLocal } from "@/lib/allget";
import { useState, useEffect } from "react";

const AdminHomePage = ({ userinfo }) => {
    const [users, Setusers] = useState([])
    const [requests, Setrequests] = useState([])

    useEffect(() => { 
        const doit = async() => {
            const users = await getFLocal('/users')
            const requests = await getFLocal('/donation_requests')
            Setusers(users)
            Setrequests(requests)
        }
        doit()
    }, [])
   
    return (
        <div className='w-full max-w-7xl mx-auto px-4 py-8 text-slate-800'>
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-rose-100 pb-6 mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 text-3xl shadow-sm animate-pulse">
                        🩸
                    </div>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-black text-rose-700 uppercase tracking-wide">
                            Welcome back, {userinfo?.name || 'Admin'}
                        </h1>
                        <p className="text-sm text-slate-500 font-medium mt-0.5">
                            Blood Donation Network Control & Metrics Center
                        </p>
                    </div>
                </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                <div className="card w-full bg-white border border-slate-100 shadow-xl rounded-2xl hover:shadow-2xl transition-all duration-300 overflow-hidden relative group">
                    <div className="absolute top-0 left-0 w-2 h-full bg-red-500 group-hover:h-full transition-all"></div>
                    <div className="card-body p-6 flex flex-row items-center justify-between gap-4">
                        <div className="space-y-1">
                            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Total Active Donors</h2>
                            <p className="text-4xl font-black text-slate-800 tracking-tight">{users?.length || 0}</p>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-red-50 text-red-500 flex items-center justify-center text-xl font-bold border border-red-100 shadow-inner">
                            👥
                        </div>
                    </div>
                </div>

                <div className="card w-full bg-white border border-slate-100 shadow-xl rounded-2xl hover:shadow-2xl transition-all duration-300 overflow-hidden relative group">
                    <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500 group-hover:h-full transition-all"></div>
                    <div className="card-body p-6 flex flex-row items-center justify-between gap-4">
                        <div className="space-y-1">
                            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Total Lifesaving Funds</h2>
                            <p className="text-4xl font-black text-slate-800 tracking-tight">$1,234</p>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center text-xl font-bold border border-emerald-100 shadow-inner">
                            💰
                        </div>
                    </div>
                </div>

                <div className="card w-full bg-white border border-slate-100 shadow-xl rounded-2xl hover:shadow-2xl transition-all duration-300 overflow-hidden relative group md:col-span-2 lg:col-span-1">
                    <div className="absolute top-0 left-0 w-2 h-full bg-rose-600 group-hover:h-full transition-all"></div>
                    <div className="card-body p-6 flex flex-row items-center justify-between gap-4">
                        <div className="space-y-1">
                            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Urgent Requests</h2>
                            <p className="text-4xl font-black text-slate-800 tracking-tight">{requests?.length || 0}</p>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center text-xl font-bold border border-rose-100 shadow-inner">
                            ❤️‍🩹
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHomePage;