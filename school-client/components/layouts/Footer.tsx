import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="py-10 px-6 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-6 mb-6">
          {/* School Info */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-600 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm nepali-text">श्री</span>
              </div>
              <div>
                <h3 className="font-bold text-sm nepali-text">श्री पञ्चावती आधारभूत विद्यालय</h3>
                <p className="text-xs text-gray-400 nepali-text">भदौरे, नेपाल</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Committed to quality education that empowers students for the future.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm mb-3 nepali-text">द्रुत लिङ्कहरू</h4>
            <ul className="space-y-1.5 text-gray-400 text-sm">
              <li>
                <Link href="#home" className="hover:text-white transition nepali-text">
                  गृहपृष्ठ
                </Link>
              </li>
              <li>
                <Link href="#about" className="hover:text-white transition nepali-text">
                  परिचय
                </Link>
              </li>
              <li>
                <Link href="#board" className="hover:text-white transition nepali-text">
                  निर्देशक मण्डल
                </Link>
              </li>
              <li>
                <Link href="#administration" className="hover:text-white transition nepali-text">
                  प्रशासन
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-bold text-sm mb-3 nepali-text">सम्पर्क विवरण</h4>
            <ul className="space-y-1.5 text-gray-400 text-sm">
              <li className="nepali-text">भदौरे, नेपाल</li>
              <li>01-5422704 / 01-5423848</li>
              <li>info@panchavati.edu.np</li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-bold text-sm mb-3">Social Media</h4>
            <div className="flex gap-3">
              <a 
                href="#" 
                className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 transition"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-800 text-center text-gray-400 text-xs">
          <p className="nepali-text">© २०८१ श्री पञ्चावती आधारभूत विद्यालय। सर्वाधिकार सुरक्षित।</p>
        </div>
      </div>
    </footer>
  );
}
