import React from 'react';
import { Button } from '@heroui/react';
import Fundtable from '@/Components/Fundtable';
import { getFLocalServer, getUserData } from '@/lib/crud';


const Funding_link = async({searchParams}) => {
    const data = await getFLocalServer('/fund')
    console.log(data)
    const { canceled } = await searchParams
    const userInfo = await getUserData()

    if (canceled) {
        console.log(
            'Order canceled -- continue to shop around and checkout when you re ready.'
        )
    }

    return (
        <div className='min-h-screen bg-rose-50/30 text-slate-800 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center'>
            <div className='w-full max-w-4xl bg-white border border-red-100 rounded-2xl shadow-xl p-6 md:p-8 flex flex-col gap-8'>
                
                <div className='text-center flex flex-col items-center gap-2 border-b border-red-50 pb-6'>
                    <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center text-red-600 font-bold text-4xl shadow-sm">
                        💝
                    </div>
                    <h1 className='text-3xl font-extrabold text-red-700 tracking-wide mt-2'>
                        Support Our Life-Saving Mission
                    </h1>
                    <p className='text-sm text-rose-500 font-medium max-w-md mx-auto'>
                        Your financial contributions help maintain our blood bank platform, manage emergency alerts, and keep our server running 24/7 to save lives.
                    </p>
                </div>

                <div className='bg-rose-50/50 rounded-2xl p-6 border border-rose-100/70 text-center flex flex-col items-center gap-4 max-w-md mx-auto w-full shadow-sm'>
                    <h3 className='text-lg font-bold text-slate-700'>Make a Contribution</h3>
                    <p className='text-xs text-slate-500'>Secure payments processed safely via Stripe checkout systems.</p>
                    <form action="/api/checkout_sessions" method="POST" className='w-full'>
                    <input className='hidden' name='email' defaultValue={userInfo?.email}></input>
                        <section className='w-full'>
                            <button type="submit" role="link" className='w-full font-bold tracking-wide bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-100 transition-all py-3 px-6 rounded-xl flex items-center justify-center gap-2 text-base cursor-pointer'>
                                Give Fund 🩸
                            </button>
                        </section>
                    </form>
                </div>

                <div className='flex flex-col gap-4 mt-4'>
                    <div className='flex flex-col gap-1 border-l-4 border-red-600 pl-3'>
                        <h2 className='text-xl font-bold text-slate-800 tracking-wide'>
                            Our Proud Supporters
                        </h2>
                        <p className='text-xs text-slate-400'>
                            A special token of gratitude to those who actively sustain our community.
                        </p>
                    </div>
                    
                    <div className='w-full bg-slate-50 border border-slate-100 rounded-xl p-1 shadow-inner overflow-hidden'>
                        <Fundtable data={data} />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Funding_link;