'use client';

import Link from 'next/link';


import { Heart, Search } from 'lucide-react'; // Clean iconography

 const Banner = () => {


  return (
    <div className="hero min-h-[70vh] bg-gradient-to-br from-red-950 via-red-900 to-neutral-900 text-white relative overflow-hidden rounded-2xl my-6 shadow-xl">
      {/* Subtle Background Decorative Elements */}
      <div className="absolute top-[-20%] left-[-10%] w-72 h-72 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Hero Content */}
      <div className="hero-content text-center z-10 px-4 max-w-3xl">
        <div className="flex flex-col items-center gap-6">
          
          {/* Small Badge */}
          <div className="badge badge-error gap-2 p-4 font-semibold text-white bg-red-600 border-none shadow-md animate-pulse">
            <Heart size={16} fill="currentColor" />
            Be A Hero, Save Lives
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
            Give Blood. <span className="text-red-500 bg-gradient-to-r from-red-400 to-rose-500 bg-clip-text text-transparent">Share Life.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base md:text-xl text-neutral-300 max-w-xl leading-relaxed">
            Your single donation can save up to three lives. Join our community of life-savers or find a matching donor near you today.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full justify-center">
            
            {/* Join as a Donor Button */}
            <Link
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white font-bold tracking-wide px-8 shadow-lg shadow-red-900/40 transition-all transform hover:-translate-y-0.5 h-14 text-md"
              href={'/Register'}
            >
              Join as a Donor
            </Link>

            {/* Search Donors Button */}
            <Link
              size="lg"
              variant="bordered"
              className="border-2 border-white/20 hover:border-white hover:bg-white/10 text-white font-bold tracking-wide px-8 transition-all transform hover:-translate-y-0.5 h-14 text-md backdrop-blur-sm"
              href={'/search'}
            >
              Search Donors
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner