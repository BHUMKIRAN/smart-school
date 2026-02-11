export default function AdministrationSection() {
  const adminStaff = [
    {
      name: 'श्री कृष्ण प्रसाद अधिकारी',
      position: 'प्रधानाध्यापक',
      qualification: 'M.Ed, B.Ed',
      experience: '20+ वर्ष'
    },
    {
      name: 'श्रीमती रमा कुमारी गौतम',
      position: 'सह-प्रधानाध्यापक',
      qualification: 'M.Ed, B.Ed',
      experience: '15+ वर्ष'
    },
    {
      name: 'श्री सुरेश बहादुर खड्का',
      position: 'प्रशासनिक अधिकृत',
      qualification: 'MBA, BBA',
      experience: '10+ वर्ष'
    }
  ];

  const departments = [
    {
      name: 'शैक्षिक विभाग',
      head: 'श्रीमती अनिता शर्मा',
      description: 'Academic planning and curriculum development'
    },
    {
      name: 'परीक्षा नियन्त्रण',
      head: 'श्री दीपक प्रधान',
      description: 'Examination management and assessment'
    },
    {
      name: 'विद्यार्थी कल्याण',
      head: 'श्रीमती सरिता थापा',
      description: 'Student welfare and counseling services'
    },
    {
      name: 'खेलकुद तथा सह-पाठ्यक्रम',
      head: 'श्री विक्रम राई',
      description: 'Sports and co-curricular activities'
    }
  ];

  return (
    <section id="administration" className="py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3 nepali-text">प्रशासनिक संरचना</h2>
          <div className="accent-bar mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experienced leadership ensuring smooth operations and quality education delivery
          </p>
        </div>

        {/* Key Administration */}
        <div className="mb-12">
          <h3 className="text-xl font-bold mb-6 nepali-text">मुख्य प्रशासकीय टोली</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {adminStaff.map((staff, index) => (
              <div key={index} className="card p-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="font-bold text-center mb-1 nepali-text">{staff.name}</h4>
                <p className="text-primary-600 font-semibold text-sm text-center mb-3 nepali-text">
                  {staff.position}
                </p>
                <div className="space-y-1 text-center text-sm text-gray-600">
                  <p>{staff.qualification}</p>
                  <p className="nepali-text">अनुभव: {staff.experience}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Departments */}
        <div>
          <h3 className="text-xl font-bold mb-6 nepali-text">विभागहरू</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {departments.map((dept, index) => (
              <div key={index} className="card p-6">
                <div className="flex gap-4">
                  <div className="icon-box flex-shrink-0">
                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1 nepali-text">{dept.name}</h4>
                    <p className="text-sm text-gray-600 mb-2 nepali-text">प्रमुख: {dept.head}</p>
                    <p className="text-sm text-gray-500">{dept.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
