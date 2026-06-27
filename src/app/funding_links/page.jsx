import React from 'react';
import { Button } from '@heroui/react';
import Fundtable from '@/Components/Fundtable';

const Funding_link = async({searchParams}) => {
    const { canceled } = await searchParams

    if (canceled) {
        console.log(
            'Order canceled -- continue to shop around and checkout when you re ready.'
        )
    }
    return (
        <div className='min-h-screen'>
            <form action="/api/checkout_sessions" method="POST">
                <section>
                    <button type="submit" role="link" className='btn'>
                        Give Fund
                    </button>
                </section>
            </form>
            <h1>All USERs who support us</h1>
            <Fundtable></Fundtable>
        </div>
    );
};

export default Funding_link;