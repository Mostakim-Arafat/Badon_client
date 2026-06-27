'use client';

import { userData } from "@/lib/allget";
import DonorHomePage from "@/Components/DonorHomePage";
import AdminHomePage from "@/Components/AdminHomePage";
import { authClient } from "@/lib/auth-client";

export default function Dashboard() {
    const { data: session, isPending } = authClient.useSession();
    const userInfo = session?.user

    if (isPending) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-spinner loading-xl"></span>
            </div>
        );
    }

    if (!userInfo) {
        return <div>User not found</div>;
    }

    switch (userInfo.role) {
        case "donor":
            return <DonorHomePage userinfo={userInfo} />;

        case "admin":
        case "volunteer":
            return <AdminHomePage userinfo={userInfo} />;

        default:
            return <div>Invalid role</div>;
    }
}