import { redirect } from 'next/navigation';
import { stripe } from '@/lib/stripe';

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)');

  const {
    status,
    customer_details: { email: customerEmail }
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  });

  if (status === 'open') {
    return redirect('/');
  }

  if (status === 'complete') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-rose-50 p-6 text-slate-800">
        <section 
          id="success" 
          className="w-full max-w-md border border-red-100 p-8 rounded-2xl shadow-xl bg-white flex flex-col items-center text-center gap-6 transform transition-all duration-500 scale-100 hover:scale-[1.01]"
        >
          {/* ANIMATED HEROIC ICON HEAD */}
          <div className="relative flex items-center justify-center">
            {/* Pulsing Ripple Rings */}
            <div className="absolute w-24 h-24 bg-red-100 rounded-full animate-ping opacity-75 duration-1000"></div>
            <div className="absolute w-20 h-20 bg-rose-100 rounded-full animate-pulse"></div>
            
            {/* Bouncing Main Heart Badge */}
            <div className="relative w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center text-3xl font-bold shadow-lg shadow-red-200 animate-bounce">
              ❤️
            </div>
          </div>

          {/* HEADER DESCRIPTION BLOCK */}
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-red-700 tracking-wide uppercase">
              Contribution Successful!
            </h2>
            <p className="text-xs font-semibold text-rose-500 tracking-wider uppercase">
              You re officially a hero today
            </p>
          </div>

          <hr className="w-16 border-red-200 rounded-full border-t-2" />

          {/* RESPONSE NOTIFICATION BODY */}
          <div className="text-sm text-slate-600 leading-relaxed font-medium bg-rose-50/50 border border-rose-100/50 p-4 rounded-xl">
            <p>
              We deeply appreciate your incredible support! A donation receipt and verification confirmation has been dispatched to:
            </p>
            <p className="font-bold text-red-600 my-2 break-all bg-white py-1.5 px-3 rounded-lg border border-red-50 inline-block">
              ✉️ {customerEmail}
            </p>
            <p className="text-xs text-slate-400 mt-2">
              If you have any platform concerns or queries, reach us anytime at{' '}
              <a 
                href="mailto:support@badon.com" 
                className="text-red-500 font-semibold underline hover:text-red-700 transition-colors"
              >
                support@badon.com
              </a>.
            </p>
          </div>

          {/* NAVIGATION DASHBOARD BUTTON */}
          <a 
            href="/dashboard" 
            className="w-full font-bold tracking-wide mt-2 bg-gradient-to-r from-red-600 to-rose-500 hover:from-red-700 hover:to-rose-600 text-white shadow-md shadow-red-200 py-3.5 rounded-xl text-center transition-all duration-200 hover:shadow-lg transform active:scale-95"
          >
            Go to My Dashboard
          </a>
        </section>
      </div>
    );
  }
}