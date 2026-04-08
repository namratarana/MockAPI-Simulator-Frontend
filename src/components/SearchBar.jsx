import { Search } from "lucide-react";

const SearchBar = ({ value, onChange }) => (
    <div className="flex items-center gap-3 bg-[#111620] border border-[#1e2740] rounded-xl px-4 py-3 mb-6">
        <Search size={16} className="text-slate-500 shrink-0" />
        <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search endpoints by URL, method, status, or data..."
            className="bg-transparent border-none outline-none text-slate-200 text-sm flex-1 placeholder-slate-600"
        />
    </div>
);

export default SearchBar;