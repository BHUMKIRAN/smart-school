export default function NoticesTab() {
  return (
    <div>
      <div className="mb-6">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-amber-500/20 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-slate-100 mb-4">Create New Notice</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Notice Title</label>
              <input type="text" placeholder="Enter notice title" className="w-full px-4 py-3 bg-slate-900/50 border border-amber-500/20 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Message</label>
              <textarea rows={4} placeholder="Enter notice message" className="w-full px-4 py-3 bg-slate-900/50 border border-amber-500/20 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 resize-none"></textarea>
            </div>
            <button type="submit" className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 rounded-lg font-semibold hover:shadow-lg transition-all">Publish Notice</button>
          </form>
        </div>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-sm border border-amber-500/20 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-slate-100 mb-4">Recent Notices</h3>
        <div className="space-y-3">
          {['Midterm Exam Schedule', 'Parent-Teacher Meeting', 'Sports Day Announcement'].map((notice, i) => (
            <div key={i} className="p-4 bg-slate-900/50 border border-amber-500/10 rounded-lg hover:border-amber-500/30 transition-colors">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium text-slate-200">{notice}</h4>
                  <p className="text-xs text-slate-400 mt-1">Posted on March {15 - i}, 2024</p>
                </div>
                <button className="px-3 py-1 bg-red-500/20 text-red-400 rounded-lg text-xs hover:bg-red-500/30 transition-colors">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
