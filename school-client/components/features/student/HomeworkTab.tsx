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
      color: 'warning', // Uses your var(--warning)
    },
    {
      subject: 'Physics',
      title: "Lab Report - Newton's Laws",
      dueDate: 'Due in 3 days',
      status: 'pending',
      color: 'primary', // Uses your var(--primary)
    },
    {
      subject: 'English',
      title: 'Essay - Shakespeare Analysis',
      dueDate: 'Submitted 2h ago',
      status: 'completed',
      color: 'success', // Uses your var(--success)
    },
  ];

  return (
    <div className="animate-fadeIn space-y-6">
      {/* Header Info */}
      <div className="flex items-center justify-between px-1">
        <h3 className="text-xl font-bold text-[var(--foreground)]">Current Assignments</h3>
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest font-bold opacity-50">Filter:</span>
          <span className="px-3 py-1 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full text-xs font-bold">
            {assignments.filter(a => a.status === 'pending').length} Pending
          </span>
        </div>
      </div>

      {/* Assignment Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {assignments.map((assignment, index) => {
          const isPending = assignment.status === 'pending';
          
          return (
            <div
              key={index}
              className="dash-card group p-5 flex flex-col justify-between hover:border-[var(--primary)]/50 transition-all duration-300"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="px-2.5 py-1 bg-[var(--secondary)] border border-[var(--dash-border)] rounded-md text-[10px] font-bold uppercase tracking-wider opacity-80">
                    {assignment.subject}
                  </span>
                  <div className={`flex items-center gap-1.5 font-bold text-[10px] uppercase tracking-tighter 
                    ${assignment.status === 'completed' ? 'text-success' : 'text-[var(--primary)]'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${assignment.status === 'completed' ? 'bg-success' : 'bg-[var(--primary)]'}`} />
                    {assignment.dueDate}
                  </div>
                </div>

                <h4 className="text-lg font-bold text-[var(--foreground)] leading-tight mb-2 group-hover:text-[var(--primary)] transition-colors">
                  {assignment.title}
                </h4>
              </div>

              <div className="mt-6">
                {isPending ? (
                  <button
                    onClick={() => onOpenModal(assignment.title)}
                    className="w-full py-3 hero-gradient text-white rounded-xl font-bold text-sm shadow-lg shadow-[var(--primary)]/10 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    Submit Assignment
                  </button>
                ) : (
                  <div className="flex items-center justify-center gap-2 py-3 bg-success/10 text-success rounded-xl text-sm font-bold">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    Turned In
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}