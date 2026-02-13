export default function GradesTab() {
  const subjects = [
    { name: 'Mathematics', grade: 'A', score: 92, color: 'text-green-400', bgColor: 'bg-green-500/20' },
    { name: 'Physics', grade: 'A-', score: 88, color: 'text-blue-400', bgColor: 'bg-blue-500/20' },
    { name: 'Chemistry', grade: 'B+', score: 85, color: 'text-purple-400', bgColor: 'bg-purple-500/20' },
    { name: 'English', grade: 'A', score: 90, color: 'text-green-400', bgColor: 'bg-green-500/20' },
    { name: 'History', grade: 'A-', score: 87, color: 'text-blue-400', bgColor: 'bg-blue-500/20' },
    { name: 'Computer Science', grade: 'A+', score: 95, color: 'text-emerald-400', bgColor: 'bg-emerald-500/20' },
  ];

  return (
    <div className="tab-content space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-200">Current Semester</h3>
        <div className="text-right">
          <p className="text-xs text-slate-400">Overall GPA</p>
          <p className="text-2xl font-bold text-purple-400">3.8</p>
        </div>
      </div>

      <div className="grid gap-4">
        {subjects.map((subject, index) => (
          <div
            key={index}
            className="glass-card rounded-xl p-5 border border-purple-500/20 hover:border-purple-500/30 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg ${subject.bgColor} flex items-center justify-center`}>
                  <span className={`text-xl font-bold ${subject.color}`}>
                    {subject.grade}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-200">{subject.name}</h4>
                  <p className="text-sm text-slate-400">Score: {subject.score}%</p>
                </div>
              </div>
              <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className={`h-full ${subject.color.replace('text-', 'bg-')} rounded-full`}
                  style={{ width: `${subject.score}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-card rounded-xl p-6 border border-purple-500/20">
        <h4 className="font-semibold text-slate-200 mb-4">Grade Distribution</h4>
        <div className="space-y-3">
          {['A+/A', 'A-/B+', 'B/B-'].map((range, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm text-slate-400">{range}</span>
              <div className="flex items-center gap-2">
                <div className="w-32 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full"
                    style={{ width: `${[75, 20, 5][index]}%` }}
                  ></div>
                </div>
                <span className="text-sm text-slate-300 w-12 text-right">
                  {[75, 20, 5][index]}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
