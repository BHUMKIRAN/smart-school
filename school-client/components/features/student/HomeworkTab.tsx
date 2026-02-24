interface HomeworkTabProps {
  onOpenModal: (subject: string) => void;
}

export default function HomeworkTab({ onOpenModal }: HomeworkTabProps) {
  const assignments = [
    {
      subject: 'Mathematics',
      title: 'Chapter 5 - Quadratic Equations',
      dueDate: 'Due Tomorrow',
      status: 'pending',
      statusColor: 'text-amber-500',
      bgColor: 'from-amber-500/10 to-amber-600/10',
      borderColor: 'border-amber-500/20',
    },
    {
      subject: 'Physics',
      title: 'Lab Report - Newton\'s Laws',
      dueDate: 'Due in 3 days',
      status: 'pending',
      statusColor: 'text-blue-500',
      bgColor: 'from-blue-500/10 to-blue-600/10',
      borderColor: 'border-blue-500/20',
    },
    {
      subject: 'English',
      title: 'Essay - Shakespeare Analysis',
      dueDate: 'Submitted',
      status: 'completed',
      statusColor: 'text-green-500',
      bgColor: 'from-green-500/10 to-green-600/10',
      borderColor: 'border-green-500/20',
    },
  ];

  return (
    <div className="tab-content space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold dash-text">Current Assignments</h3>
        <span className="px-3 py-1 dash-card-alt rounded-full text-xs font-medium text-purple-500">
          {assignments.filter(a => a.status === 'pending').length} Pending
        </span>
      </div>

      {assignments.map((assignment, index) => (
        <div
          key={index}
          className={`dash-card bg-gradient-to-br ${assignment.bgColor} border ${assignment.borderColor} p-6 hover:shadow-md transition-all`}
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 dash-card-alt rounded-full text-xs font-medium text-purple-500">
                  {assignment.subject}
                </span>
                <span className={`text-xs ${assignment.statusColor}`}>
                  {assignment.dueDate}
                </span>
              </div>
              <h4 className="text-lg font-semibold dash-text">{assignment.title}</h4>
            </div>
            <svg className={`w-6 h-6 ${assignment.statusColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {assignment.status === 'completed' ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              )}
            </svg>
          </div>

          {assignment.status === 'pending' && (
            <button
              onClick={() => onOpenModal(assignment.title)}
              className="w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all"
            >
              Submit Assignment
            </button>
          )}

          {assignment.status === 'completed' && (
            <div className="flex items-center gap-2 text-sm text-green-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Submitted on time
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
