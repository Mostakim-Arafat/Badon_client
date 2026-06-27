'use client';



import { Card, Button } from '@heroui/react'; 
import Link from 'next/link';

export default function FeaturedSection() {
  const features = [
    {
      // Blood Droplet SVG
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 text-red-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.75c4.418 0 8-3.582 8-8 0-4.418-8-11.25-8-11.25S4 9.332 4 13.75c0 4.418 3.582 8 8 8z" />
        </svg>
      ),
      title: "Real-Time Request Matching",
      description: "Our smart system connects urgent blood requests directly with eligible, nearby donors of matching blood types instantly."
    },
    {
      // Shield Check SVG
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 text-emerald-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
        </svg>
      ),
      title: "Secure & Verified Profiles",
      description: "Donor privacy and health safety are paramount. All medical disclosures and contact information are fully encrypted."
    },
    {
      // Users SVG
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 text-blue-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
      ),
      title: "Community Driven Network",
      description: "Join thousands of active lifesavers, local hospitals, and blood banks collaborating to ensure zero supply shortages."
    }
  ];

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="badge badge-outline border-red-500 text-red-500 gap-2 mb-3 px-3 py-1 text-xs uppercase tracking-widest font-semibold">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
          </svg>
          Why LifeFlow?
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-800 dark:text-neutral-100">
          Making Blood Donation <span className="text-red-600">Simple, Transparent & Fast</span>
        </h2>
        <p className="mt-4 text-neutral-500 dark:text-neutral-400 text-base md:text-lg">
          In critical moments, every second counts. We ve optimized the bridge between those who need blood and the heroes willing to give it.
        </p>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <Card 
            key={index} 
            className="border border-neutral-100 dark:border-neutral-800 shadow-md hover:shadow-xl transition-all duration-300 bg-white dark:bg-neutral-900 cursor-pointer"
          >
            {/* Switched from CardBody to Card.Content (HeroUI v3 Standard) */}
            <Card.Content className="p-8 gap-4 flex flex-col items-start text-left">
              {/* Dynamic Icon Container */}
              <div className="p-3 bg-neutral-50 dark:bg-neutral-800 rounded-2xl shadow-inner">
                {feature.icon}
              </div>
              
              <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-100">
                {feature.title}
              </h3>
              
              <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                {feature.description}
              </p>
            </Card.Content>
          </Card>
        ))}
      </div>

      {/* CTA Bottom Banner */}
      <div className="mt-16 stats stats-vertical lg:stats-horizontal shadow-lg border border-neutral-100 dark:border-neutral-800 w-full bg-white dark:bg-neutral-900 rounded-2xl p-4 lg:p-6 flex flex-col lg:flex-row items-center justify-between gap-6">
        
        <div className="stat border-none flex items-center gap-4 text-left w-full lg:w-auto">
          <div className="p-3 bg-red-50 dark:bg-red-950/30 text-red-600 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
            </svg>
          </div>
          <div>
            <div className="stat-title text-xs md:text-sm font-medium text-neutral-400">Ready to make a difference?</div>
            <div className="stat-value text-xl md:text-2xl font-bold text-neutral-800 dark:text-neutral-100">Check Your Eligibility</div>
          </div>
        </div>

        <div className="px-6 pb-4 lg:pb-0 w-full lg:w-auto flex justify-end">
          <Button
            as={Link}
            href="/eligibility-quiz"
            className="w-full lg:w-auto bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-neutral-100 dark:hover:bg-neutral-200 dark:text-neutral-900 font-semibold px-6 shadow-sm transition-transform active:scale-95"
          >
            Take 2-Min Health Quiz
          </Button>
        </div>

      </div>

    </section>
  );
}