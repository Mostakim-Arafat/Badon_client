'use client';

import { getFLocal } from "@/lib/allget";
import { useState, useEffect } from "react";
const AdminHomePage = ({ userinfo }) => {
    const [users,Setusers] = useState([])
    const [requests,Setrequests] = useState([])
    useEffect(() => { 
        const doit = async() => {
        const users = await getFLocal('/users')
        const requests = await getFLocal('/donation_requests')
        Setusers(users)
        Setrequests(requests)
    }
     doit()},[])
   
    return (
        <div className='w-11/12 mx-auto'>
            <h1>Welcome {userinfo.name}</h1>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-2 text-center'>
                {/* card1 */}
                <div className="card w-96 bg-base-100 card-lg shadow-sm">
                    <div className="card-body">
                        <h2 className="card-title">Total Users</h2>
                        <p>{users?.length}</p>
                    </div>
                </div>
                {/* card2 */}
                <div className="card w-96 bg-base-100 card-lg shadow-sm">
                    <div className="card-body">
                        <h2 className="card-title">Total funding</h2>
                        <p>$1234</p>
                    </div>
                </div>
                {/* card3 */}
                <div className="card w-96 bg-base-100 card-lg shadow-sm">
                    <div className="card-body">
                        <h2 className="card-title">Total Donation Request</h2>
                        <p>{requests?.length}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHomePage;