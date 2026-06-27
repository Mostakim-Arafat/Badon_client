'use client';

import React from 'react';
import { Form, TextField, Label, Input, TextArea, Button } from '@heroui/react';

export default function ContactSection() {
  
  // Handles the form submission logic in plain JavaScript
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    console.log('Submitted Blood Bank Query:', data);
    // You can now pass 'data' to your API route
  };

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start bg-neutral-50 dark:bg-neutral-900/40 rounded-3xl p-6 md:p-12 border border-neutral-100 dark:border-neutral-800 shadow-sm">
        
        {/* Left Side: Contact Information Panel */}
        <div className="lg:col-span-5 space-y-8 text-left">
          <div>
            <div className="badge badge-error gap-2 mb-3 px-3 py-1 text-xs uppercase tracking-widest font-semibold text-white bg-red-600 border-none">
              Get In Touch
            </div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-neutral-800 dark:text-neutral-100">
              Have Questions? <br />
              <span className="text-red-600">We Are Here To Help</span>
            </h2>
            <p className="mt-4 text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Whether you are an aspiring donor with medical questions, a hospital seeking coordination, or looking to set up a local blood drive, reach out directly.
            </p>
          </div>

          {/* Contact Methods */}
          <div className="space-y-6">
            
            {/* Phone Support */}
            <div className="flex items-center gap-4 p-4 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-100 dark:border-neutral-800 shadow-sm">
              <div className="p-3 bg-red-50 dark:bg-red-950/30 text-red-600 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.645-5.127-3.95-6.772-6.772l1.293-.97c.362-.271.528-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider">24/7 Urgent Hotline</h4>
                <a href="tel:+18001234567" className="text-lg font-bold text-neutral-800 dark:text-neutral-100 hover:text-red-600 transition-colors">
                  1-800-123-4567
                </a>
              </div>
            </div>

            {/* Email Support */}
            <div className="flex items-center gap-4 p-4 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-100 dark:border-neutral-800 shadow-sm">
              <div className="p-3 bg-red-50 dark:bg-red-950/30 text-red-600 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider">Email Helpdesk</h4>
                <a href="mailto:support@lifeflow.org" className="text-lg font-bold text-neutral-800 dark:text-neutral-100 hover:text-red-600 transition-colors">
                  support@lifeflow.org
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Right Side: HeroUI Form Structure */}
        <div className="lg:col-span-7 bg-white dark:bg-neutral-950 rounded-2xl border border-neutral-100 dark:border-neutral-800 p-6 md:p-8 shadow-md">
          <Form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              {/* Name Input */}
              <TextField isRequired name="fullName" className="w-full">
                <Label className="text-sm font-medium mb-1 inline-block text-neutral-700 dark:text-neutral-300">Your Name</Label>
                <Input placeholder="John Doe" className="w-full" />
              </TextField>

              {/* Email Input */}
              <TextField isRequired name="email" type="email" className="w-full">
                <Label className="text-sm font-medium mb-1 inline-block text-neutral-700 dark:text-neutral-300">Email Address</Label>
                <Input placeholder="john@example.com" className="w-full" />
              </TextField>
            </div>

            {/* Subject Input */}
            <TextField isRequired name="subject" className="w-full">
              <Label className="text-sm font-medium mb-1 inline-block text-neutral-700 dark:text-neutral-300">Subject / Inquiry Type</Label>
              <Input placeholder="e.g., Eligibility query, Hospital partnership" className="w-full" />
            </TextField>

            {/* Message Textarea */}
            <TextField isRequired name="message" className="w-full">
              <Label className="text-sm font-medium mb-1 inline-block text-neutral-700 dark:text-neutral-300">Your Message</Label>
              <TextArea placeholder="Tell us how we can help you..." className="w-full min-h-[120px]" />
            </TextField>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold h-12 text-md shadow-md shadow-red-900/20 transition-transform active:scale-[0.99]"
            >
              Send Message
            </Button>

          </Form>
        </div>

      </div>
    </section>
  );
}