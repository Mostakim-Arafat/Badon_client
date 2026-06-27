'use client'
import { userData } from "@/lib/allget";
import DonorHomePage from "@/Components/DonorHomePage";
import AdminHomePage from "@/Components/AdminHomePage";


const Dashboard = () => {
    const userinfo = userData()
    console.log(userinfo)
    
    
    if(userinfo?.role === 'donor'){
         return (
        <div>
            <DonorHomePage userinfo={userinfo}></DonorHomePage>
        </div>
    );
    }
    if(userinfo?.role === 'admin'){
         return (
        <div>
            <AdminHomePage userinfo={userinfo}></AdminHomePage>
        </div>
    );
    }
    if(userinfo?.role === 'volunteer'){
         return (
        <div>
            <AdminHomePage userinfo={userinfo}></AdminHomePage>
        </div>
    );
    }
   
};

export default Dashboard;