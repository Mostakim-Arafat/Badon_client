'use client';

import React from 'react';
import { Card, Button } from '@heroui/react';
import Link from 'next/link';

export default function DonationRequestCard({ request }) {
  console.log(request)
  const { 
    recipientName,
    bloodGroup,
     recipientDistrict,
   donationTime,
   donationDate
  } = request

  


  return (
    <div>
      <Card className="max-w-md w-full border border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-md hover:shadow-lg transition-shadow duration-300 rounded-2xl overflow-hidden">
      <Card.Content className="p-5 flex flex-col gap-4">
        
     
        <div className="flex items-start justify-between gap-4">
          <div className="text-left">
            <span className="text-xs font-semibold tracking-wider uppercase text-neutral-400 block mb-0.5">
              Recipient
            </span>
            <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-100 line-clamp-1">
              {recipientName}
            </h3>
          </div>
          
         
          <div className="flex flex-col items-center justify-center bg-red-50 dark:bg-red-950/40 border border-red-100 dark:border-red-900/50 rounded-xl px-4 py-2 min-w-[64px] text-center shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 text-red-600 mb-0.5">
              <path d="M12 21.75c4.418 0 8-3.582 8-8 0-4.418-8-11.25-8-11.25S4 9.332 4 13.75c0 4.418 3.582 8 8 8z" />
            </svg>
            <span className="text-xl font-black text-red-600 tracking-tight">
              {bloodGroup}
            </span>
          </div>
        </div>

        
        <hr className="border-neutral-100 dark:border-neutral-800" />

      
        <div className="space-y-3 text-sm text-left">
          
         
          <div className="flex items-start gap-3 text-neutral-600 dark:text-neutral-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-neutral-400 mt-0.5 shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            <span className="line-clamp-2">{recipientDistrict}</span>
          </div>

        
          <div className="grid grid-cols-2 gap-2 pt-1">
            
           
            <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400 text-xs">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-neutral-400 shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
              <span>{donationDate}</span>
            </div>

           
            <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400 text-xs">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-neutral-400 shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium text-amber-600 dark:text-amber-400 line-clamp-1">
                {donationTime}
              </span>
            </div>

          </div>

        </div>

       
        <div className="mt-2">
          <Link
            href={`/donation_requests/${request._id}`}
            className=" btn w-full bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-neutral-100 dark:hover:bg-neutral-200 dark:text-neutral-900 font-bold tracking-wide h-11 text-sm shadow-sm transition-all rounded-xl"
          >
            View Details
          </Link>
        </div>

      </Card.Content>
    </Card>
    </div>

  );
}