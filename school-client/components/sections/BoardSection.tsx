export default function BoardSection() {
  const boardMembers = [
    {
      name: 'श्री राम बहादुर थापा',
      position: 'अध्यक्ष',
      description: 'Community Leader & Education Advocate'
    },
    {
      name: 'श्रीमती सीता देवी श्रेष्ठ',
      position: 'उपाध्यक्ष',
      description: 'Social Worker & Women Empowerment Activist'
    },
    {
      name: 'श्री हरि प्रसाद पौडेल',
      position: 'सदस्य',
      description: 'Retired Principal & Educational Consultant'
    },
    {
      name: 'श्रीमती लक्ष्मी गुरुङ',
      position: 'सदस्य',
      description: 'Parent Representative & Business Owner'
    },
    {
      name: 'श्री गोविन्द राज जोशी',
      position: 'सदस्य सचिव',
      description: 'Administrative Expert'
    }
  ];

  return (
    <section id="board" className="py-16 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3 nepali-text">विद्यालय व्यवस्थापन समिति</h2>
          <div className="accent-bar mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Dedicated leaders committed to the school&apos;s vision and continuous improvement
          </p>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
          {boardMembers.map((member, index) => (
            <div key={index} className="card p-6 text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-bold mb-1 nepali-text">{member.name}</h3>
              <p className="text-primary-600 font-semibold text-sm mb-2 nepali-text">{member.position}</p>
              <p className="text-gray-600 text-xs">{member.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
