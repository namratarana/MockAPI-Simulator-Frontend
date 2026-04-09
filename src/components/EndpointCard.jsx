import { getStatusColor } from "../utils/helpers";
import IconBtn from "./IconBtn";
import MethodBadge from "./MethodBadge";
import { Pencil, Trash2 } from 'lucide-react';

const EndpointCard = ({ ep, onEdit, onDelete }) => (
  <div className="bg-[#161b27] border border-[#232a3a] rounded-xl p-5 mb-4 transition-colors duration-200 hover:border-[#2a3550]">
    <div className="flex items-center gap-3 mb-4">
      <MethodBadge method={ep.method} />
      <div className="flex-1 bg-[#0e1320] border border-[#1e2740] rounded-lg px-4 py-2 font-mono text-sm text-slate-300 tracking-wide">
        {ep.url}
      </div>
      <div className="flex gap-2">
        <IconBtn onClick={() => onEdit(ep)} title="Edit" hoverClass="hover:border-blue-700 hover:text-blue-400">
          <Pencil size={14} />
        </IconBtn>
        <IconBtn onClick={() => onDelete(ep.id)} title="Delete" hoverClass="hover:border-red-800 hover:text-red-400">
          <Trash2 size={14} />
        </IconBtn>
      </div>
    </div>

    <p className="text-sm text-slate-400 mb-2">
      Status:{" "}
      <span className={`font-bold font-mono ${getStatusColor(ep.status)}`}>{ep.status}</span>
    </p>

    <p className="text-sm text-slate-400 mb-2">Response Data:</p>
    <pre className="bg-[#0e1320] border border-[#1e2740] rounded-lg px-4 py-3 m-0 font-mono text-xs text-slate-400 max-h-32 overflow-y-auto leading-relaxed">
      {ep.data}
    </pre>

    <div className="flex gap-4 mt-3 text-xs text-slate-600">
      <span>Created: {ep.created_at}</span>
      <span>•</span>
      <span>Updated: {ep.updated_at}</span>
    </div>
  </div>
);

export default EndpointCard;