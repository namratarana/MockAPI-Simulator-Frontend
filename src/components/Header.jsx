import { Database, Plus } from "lucide-react";

const Header = ({ onNewEndpoint }) => (
    <div className="flex justify-between items-center mb-7">
        <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center shadow-lg shadow-violet-900/50 shrink-0">
            <Database size={20} className="text-white" />
            </div>
            <div>
            <h1 className="text-xl font-bold text-violet-400 leading-tight">Mock API Manager</h1>
            <p className="text-xs text-slate-500 mt-0.5">Create and manage your mock API endpoints</p>
            </div>
        </div>
        <button
            onClick={onNewEndpoint}
            className="flex items-center gap-2 bg-gradient-to-br from-violet-600 to-violet-800 text-white text-sm font-semibold px-5 py-2.5 rounded-xl border-none cursor-pointer hover:opacity-90 transition-opacity shadow-lg shadow-violet-900/50"
        >
            <Plus size={16} />
            New Endpoint
        </button>
    </div>
);

export default Header;