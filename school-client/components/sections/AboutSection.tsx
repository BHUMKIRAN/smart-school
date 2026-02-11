export default function AboutSection() {
  const features = [
    {
      icon: (
        <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: 'गुणस्तरीय शिक्षा',
      description: 'Comprehensive curriculum focusing on academic excellence'
    },
    {
      icon: (
        <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'अनुभवी शिक्षक',
      description: 'Dedicated team of experienced educators'
    },
    {
      icon: (
        <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: 'समग्र विकास',
      description: 'Focus on character, values, and life skills'
    },
    {
      icon: (
        <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      title: 'आधुनिक सुविधा',
      description: 'Well-equipped classrooms and facilities'
    }
  ];

  return (
    <section id="about" className="py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3 nepali-text">विद्यालयको परिचय</h2>
          <div className="accent-bar mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Empowering young minds since establishment, we are committed to providing quality education that shapes future leaders.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="card p-6">
            <h3 className="text-xl font-bold mb-4 nepali-text">हाम्रो दृष्टिकोण</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              To be a center of educational excellence, nurturing responsible citizens who contribute positively to society through knowledge, character, and innovation.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We believe in holistic development that goes beyond textbooks, preparing students for real-world challenges while maintaining strong moral and ethical values.
            </p>
          </div>

          <div className="card p-6">
            <h3 className="text-xl font-bold mb-4 nepali-text">हाम्रो लक्ष्य</h3>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <svg className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-600">Provide quality education accessible to all</span>
              </li>
              <li className="flex gap-3">
                <svg className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-600">Foster critical thinking and creativity</span>
              </li>
              <li className="flex gap-3">
                <svg className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-600">Build character and ethical values</span>
              </li>
              <li className="flex gap-3">
                <svg className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-600">Create a safe and inclusive environment</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="card p-6 text-center">
              <div className="icon-box mx-auto mb-4">
                {feature.icon}
              </div>
              <h4 className="font-semibold mb-2 nepali-text">{feature.title}</h4>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
