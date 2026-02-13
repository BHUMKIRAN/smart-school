export default function EmergencyTab() {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-red-500/20 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
          <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-100">Emergency Alert System</h3>
          <p className="text-sm text-slate-400">Send critical notifications to all users</p>
        </div>
      </div>
      
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Alert Title</label>
          <input type="text" placeholder="Enter emergency alert title" className="w-full px-4 py-3 bg-slate-900/50 border border-red-500/20 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500/50" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Alert Message</label>
          <textarea rows={4} placeholder="Enter critical information" className="w-full px-4 py-3 bg-slate-900/50 border border-red-500/20 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500/50 resize-none"></textarea>
        </div>
        <button type="submit" className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all">Send Emergency Alert</button>
      </form>
    </div>
  );
}
