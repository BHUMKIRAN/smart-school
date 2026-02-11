'use client';

import { FormEvent, useState } from 'react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('सन्देश पठाइएको छ! धन्यवाद।');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section id="contact" className="py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3 nepali-text">सम्पर्क गर्नुहोस्</h2>
          <div className="accent-bar mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get in touch with us for admissions, inquiries, or any other information
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-bold mb-6 nepali-text">सम्पर्क जानकारी</h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="icon-box flex-shrink-0">
                  <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1 nepali-text">ठेगाना</h4>
                  <p className="text-gray-600 text-sm nepali-text">भदौरे, नेपाल</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="icon-box flex-shrink-0">
                  <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1 nepali-text">फोन नम्बर</h4>
                  <p className="text-gray-600 text-sm">01-5422704 / 01-5423848</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="icon-box flex-shrink-0">
                  <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1 nepali-text">इमेल ठेगाना</h4>
                  <p className="text-gray-600 text-sm">info@panchavati.edu.np</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="icon-box flex-shrink-0">
                  <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1 nepali-text">कार्यालय समय</h4>
                  <p className="text-gray-600 text-sm nepali-text">आइतबार - शुक्रबार</p>
                  <p className="text-gray-600 text-sm">10:00 AM - 5:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card p-6">
            <h3 className="text-xl font-bold mb-5 nepali-text">सन्देश पठाउनुहोस्</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 nepali-text">नाम</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition nepali-text"
                  placeholder="तपाईंको नाम"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 nepali-text">इमेल</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 nepali-text">विषय</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition nepali-text"
                  placeholder="सन्देशको विषय"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 nepali-text">सन्देश</label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition nepali-text"
                  placeholder="तपाईंको सन्देश..."
                  required
                />
              </div>
              <button type="submit" className="w-full btn btn-primary nepali-text">
                पठाउनुहोस्
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
