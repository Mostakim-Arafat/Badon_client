'use client'

import { authClient } from "@/lib/auth-client";
import { ToastContainer, toast } from 'react-toastify';
import { useState } from "react";
import Image from "next/image";

const Profile = () => {
    const [edit, setedit] = useState(false)
    const { data: session, isPending } = authClient.useSession()
    if (isPending) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <span className="loading loading-ring loading-lg text-red-600"></span>
            </div>
        );
    }
    const userInfo = session?.user
    console.log(userInfo)

    const editProfile = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        const { data: updated, error } = await authClient.updateUser({
            image: data.image,
            name: data.name,
        });
        if (error) {
            toast.error(error.message || 'Failed to update profile');
            return;
        }
        toast.success('Profile Update success');
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    }

    return (
        <div className="max-w-xl mx-auto bg-white rounded-2xl border border-red-100 shadow-xl p-6 md:p-8 my-6 text-slate-800">
            <div className="flex flex-col items-center border-b border-rose-50 pb-6 mb-6 text-center">
                <div className="relative group mb-4 w-24 h-24">
                    <div className="absolute inset-0 bg-red-100 rounded-full blur-md opacity-70 group-hover:opacity-100 transition-opacity"></div>
                    {userInfo?.image ? (
                        <div className="relative w-24 h-24 rounded-full border-4 border-red-500 overflow-hidden shadow-md">
                            <Image 
                                src={userInfo.image} 
                                alt={userInfo.name || "User Profile"} 
                                fill
                                sizes="96px"
                                className="object-cover"
                                priority
                            />
                        </div>
                    ) : (
                        <div className="relative w-24 h-24 rounded-full border-4 border-red-500 bg-rose-50 flex items-center justify-center text-red-500 text-3xl font-bold shadow-md">
                            🩸
                        </div>
                    )}
                </div>
                <h1 className="text-2xl font-black text-red-700 tracking-wide uppercase">Profile</h1>
                <p className="text-xs text-rose-500 font-semibold uppercase tracking-wider mt-1">Life Saver Dashboard Panel</p>
            </div>

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-md font-bold tracking-wider text-slate-400 uppercase">Account Information</h2>
                {edit === false && (
                    <button className="btn btn-sm px-5 bg-red-600 hover:bg-red-700 border-none text-white font-bold rounded-xl shadow-md shadow-red-100 transition-transform active:scale-95 cursor-pointer" onClick={() => setedit(true)}>
                        ✏️ Edit Profile
                    </button>
                )}
            </div>

            {
                edit &&
                <form onSubmit={editProfile} className="animate-fadeIn">
                    <fieldset className="fieldset space-y-4 bg-rose-50/30 border border-rose-100/50 p-5 rounded-2xl">
                        <div>
                            <label className="label text-slate-600 font-bold text-xs uppercase tracking-wide mb-1.5">Full Name</label>
                            <input type="text" className="input input-bordered w-full focus:outline-none focus:border-red-500 border-slate-200 rounded-xl bg-white text-slate-800 font-medium px-4 py-3 h-auto" defaultValue={userInfo.name} name="name" required />
                        </div>

                        <div>
                            <label className="label text-slate-400 font-bold text-xs uppercase tracking-wide mb-1.5">Email Address (Read-Only)</label>
                            <input type="email" disabled className="input input-bordered w-full border-slate-100 bg-slate-50 text-slate-400 cursor-not-allowed rounded-xl font-medium px-4 py-3 h-auto" defaultValue={userInfo.email} name="email" />
                        </div>

                        <div>
                            <label className="label text-slate-600 font-bold text-xs uppercase tracking-wide mb-1.5">Profile Image URL</label>
                            <input type="url" className="input input-bordered w-full focus:outline-none focus:border-red-500 border-slate-200 rounded-xl bg-white text-slate-500 font-mono text-xs px-4 py-3 h-auto" defaultValue={userInfo.image} name="image" />
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button className="btn flex-1 bg-gradient-to-r from-red-600 to-rose-500 hover:from-red-700 hover:to-rose-600 border-none text-white font-bold rounded-xl shadow-md shadow-red-100 transition-all cursor-pointer" type="submit">
                                Save Changes
                            </button>
                            <button type="button" className="btn px-5 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-600 font-bold rounded-xl transition-all cursor-pointer" onClick={() => setedit(false)}>
                                Cancel
                            </button>
                        </div>
                    </fieldset>
                </form>
            }

            {
                edit === false &&
                <fieldset className="fieldset space-y-4 bg-slate-50/50 border border-slate-100 p-5 rounded-2xl">
                    <div>
                        <label className="label text-slate-400 font-bold text-xs uppercase tracking-wide mb-1">Full Name</label>
                        <input type="text" disabled className="input input-bordered w-full border-transparent bg-white shadow-sm text-slate-700 rounded-xl font-bold px-4 py-3 h-auto cursor-default" defaultValue={userInfo.name} name="name" />
                    </div>

                    <div>
                        <label className="label text-slate-400 font-bold text-xs uppercase tracking-wide mb-1">Email Address</label>
                        <input type="email" disabled className="input input-bordered w-full border-transparent bg-white shadow-sm text-slate-700 rounded-xl font-medium px-4 py-3 h-auto cursor-default" defaultValue={userInfo.email} name="email" />
                    </div>

                    <div>
                        <label className="label text-slate-400 font-bold text-xs uppercase tracking-wide mb-1">Profile Avatar Endpoint</label>
                        <input type="url" disabled className="input input-bordered w-full border-transparent bg-white shadow-sm text-slate-400 font-mono text-xs rounded-xl px-4 py-3 h-auto cursor-default truncate" defaultValue={userInfo.image || "No avatar image linked"} name="image" />
                    </div>
                </fieldset>
            }

            <ToastContainer position="bottom-right" theme="colored" />
        </div>
    );
};

export default Profile;