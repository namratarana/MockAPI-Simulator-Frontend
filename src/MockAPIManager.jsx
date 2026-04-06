/**
 * Mock API Manager
 * ─────────────────────────────────────────────
 * Styling  : Tailwind CSS utility classes
 * Icons    : lucide-react
 * Structure: Modular components (see folder layout below)
 *
 * Folder layout (for a real Vite/CRA project):
 *
 * src/
 * ├── data/
 * │   └── constants.js        ← HTTP_METHODS, METHOD_STYLES, INITIAL_ENDPOINTS
 * ├── utils/
 * │   └── helpers.js          ← getStatusColor, filterEndpoints, countByMethod
 * ├── hooks/
 * │   └── useEndpoints.js     ← all endpoint state + CRUD logic
 * ├── components/
 * │   ├── Header.jsx
 * │   ├── SearchBar.jsx
 * │   ├── StatsCard.jsx
 * │   ├── MethodBadge.jsx
 * │   ├── EndpointCard.jsx
 * │   ├── EndpointList.jsx
 * │   └── EndpointModal.jsx
 * └── App.jsx
 */

import { useState } from "react";
import { Database, Plus, Search, Pencil, Trash2, X } from "lucide-react";

// ─── data/constants.js ────────────────────────────────────────────────────────

const INITIAL_ENDPOINTS = [
  {
    id: 1, method: "GET", path: "/api/users", status: 200,
    responseData: `[\n  {\n    "id": 1,\n    "name": "Aarav",\n    "email": "aarav@example.com"\n  },\n  {\n    "id": 2,\n    "name": "Priya",\n    "email": "priya@example.com"\n  }\n]`,
    created: "4/1/2026, 4:00:00 PM", updated: "4/1/2026, 4:00:00 PM",
  },
  {
    id: 2, method: "POST", path: "/api/products", status: 201,
    responseData: `{\n  "id": 101,\n  "name": "Wireless Headphones",\n  "price": 2999,\n  "stock": 50\n}`,
    created: "4/1/2026, 4:00:00 PM", updated: "4/1/2026, 4:00:00 PM",
  },
  {
    id: 3, method: "GET", path: "/api/orders", status: 200,
    responseData: `[\n  {\n    "orderId": "ORD001",\n    "userId": 1,\n    "total": 2999\n  }\n]`,
    created: "4/1/2026, 4:00:00 PM", updated: "4/1/2026, 4:00:00 PM",
  },
  {
    id: 4, method: "PUT", path: "/api/users/:id", status: 200,
    responseData: `{\n  "id": 1,\n  "name": "Aarav Updated",\n  "email": "aarav@example.com"\n}`,
    created: "4/1/2026, 4:00:00 PM", updated: "4/1/2026, 4:00:00 PM",
  },
  {
    id: 5, method: "DELETE", path: "/api/orders/:id", status: 204,
    responseData: `{}`,
    created: "4/1/2026, 4:00:00 PM", updated: "4/1/2026, 4:00:00 PM",
  },
];

const HTTP_METHODS = ["GET", "POST", "PUT", "DELETE", "PATCH"];

const METHOD_STYLES = {
  GET:    "bg-emerald-950 text-emerald-400 border border-emerald-800/50",
  POST:   "bg-blue-950 text-blue-400 border border-blue-800/50",
  PUT:    "bg-amber-950 text-amber-400 border border-amber-800/50",
  DELETE: "bg-red-950 text-red-400 border border-red-800/50",
  PATCH:  "bg-purple-950 text-purple-400 border border-purple-800/50",
};

// ─── utils/helpers.js ─────────────────────────────────────────────────────────

const getNow = () => new Date().toLocaleString("en-IN");

const getStatusColor = (code) => {
  if (code >= 200 && code < 300) return "text-emerald-400";
  if (code >= 300 && code < 400) return "text-amber-400";
  if (code >= 400) return "text-red-400";
  return "text-slate-400";
};

const filterEndpoints = (endpoints, query) => {
  const q = query.toLowerCase();
  if (!q) return endpoints;
  return endpoints.filter(
    (ep) =>
      ep.path.toLowerCase().includes(q) ||
      ep.method.toLowerCase().includes(q) ||
      String(ep.status).includes(q) ||
      ep.responseData.toLowerCase().includes(q)
  );
};

const countByMethod = (endpoints, method) =>
  endpoints.filter((e) => e.method === method).length;

// ─── hooks/useEndpoints.js ────────────────────────────────────────────────────

const useEndpoints = () => {
  const [endpoints, setEndpoints] = useState(INITIAL_ENDPOINTS);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);

  const filtered = filterEndpoints(endpoints, search);
  const stats = {
    total: endpoints.length,
    get: countByMethod(endpoints, "GET"),
    post: countByMethod(endpoints, "POST"),
  };

  const openNew = () => setModal({ mode: "new" });
  const openEdit = (endpoint) => setModal({ mode: "edit", endpoint });
  const closeModal = () => setModal(null);

  const saveEndpoint = (form) => {
    if (modal.mode === "new") {
      setEndpoints((prev) => [
        ...prev,
        { id: Date.now(), ...form, created: getNow(), updated: getNow() },
      ]);
    } else {
      setEndpoints((prev) =>
        prev.map((e) =>
          e.id === modal.endpoint.id ? { ...e, ...form, updated: getNow() } : e
        )
      );
    }
    closeModal();
  };

  const deleteEndpoint = (id) =>
    setEndpoints((prev) => prev.filter((e) => e.id !== id));

  return { filtered, stats, search, setSearch, modal, openNew, openEdit, closeModal, saveEndpoint, deleteEndpoint };
};

// ─── components/MethodBadge.jsx ───────────────────────────────────────────────

const MethodBadge = ({ method }) => (
  <span className={`${METHOD_STYLES[method] || METHOD_STYLES.GET} text-xs font-bold font-mono tracking-widest px-3 py-1 rounded-md min-w-[52px] text-center inline-block`}>
    {method}
  </span>
);

// ─── components/Header.jsx ────────────────────────────────────────────────────

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

// ─── components/SearchBar.jsx ─────────────────────────────────────────────────

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

// ─── components/StatsCard.jsx ─────────────────────────────────────────────────

const StatsCard = ({ label, value, valueColor = "text-slate-100" }) => (
  <div className="bg-[#111620] border border-[#1e2740] rounded-xl px-6 py-5">
    <p className={`text-sm font-medium mb-2 ${valueColor === "text-slate-100" ? "text-slate-400" : valueColor}`}>
      {label}
    </p>
    <p className={`text-4xl font-bold leading-none ${valueColor}`}>{value}</p>
  </div>
);

// ─── components/EndpointCard.jsx ──────────────────────────────────────────────

const IconBtn = ({ onClick, title, hoverClass, children }) => (
  <button
    onClick={onClick}
    title={title}
    className={`bg-transparent border border-[#2a3550] rounded-lg p-2 text-slate-500 cursor-pointer flex items-center justify-center transition-all duration-150 ${hoverClass}`}
  >
    {children}
  </button>
);

const EndpointCard = ({ ep, onEdit, onDelete }) => (
  <div className="bg-[#161b27] border border-[#232a3a] rounded-xl p-5 mb-4 transition-colors duration-200 hover:border-[#2a3550]">
    <div className="flex items-center gap-3 mb-4">
      <MethodBadge method={ep.method} />
      <div className="flex-1 bg-[#0e1320] border border-[#1e2740] rounded-lg px-4 py-2 font-mono text-sm text-slate-300 tracking-wide">
        {ep.path}
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
      {ep.responseData}
    </pre>

    <div className="flex gap-4 mt-3 text-xs text-slate-600">
      <span>Created: {ep.created}</span>
      <span>•</span>
      <span>Updated: {ep.updated}</span>
    </div>
  </div>
);

// ─── components/EndpointList.jsx ──────────────────────────────────────────────

const EndpointList = ({ endpoints, search, onEdit, onDelete }) => (
  <div className="bg-[#0e1320] border border-[#1e2740] rounded-2xl p-6">
    <h2 className="text-lg font-semibold text-slate-100 mb-5">API Endpoints</h2>
    {endpoints.length === 0 ? (
      <div className="text-center text-slate-500 py-12 text-sm">
        {search ? "No endpoints match your search." : "No endpoints yet. Create your first one!"}
      </div>
    ) : (
      endpoints.map((ep) => (
        <EndpointCard key={ep.id} ep={ep} onEdit={onEdit} onDelete={onDelete} />
      ))
    )}
  </div>
);

// ─── components/EndpointModal.jsx ─────────────────────────────────────────────

const inputCls = "w-full bg-[#0e1320] border border-[#2a3550] rounded-lg px-3 py-2.5 text-slate-200 text-sm font-mono outline-none focus:border-violet-600 transition-colors";

const FormField = ({ label, children }) => (
  <div className="mb-4">
    <label className="block text-xs text-slate-400 mb-1.5">{label}</label>
    {children}
  </div>
);

const EndpointModal = ({ mode, endpoint, onClose, onSave }) => {
  const isNew = mode === "new";
  const [form, setForm] = useState(
    isNew
      ? { method: "GET", path: "", status: 200, responseData: "" }
      : { method: endpoint.method, path: endpoint.path, status: endpoint.status, responseData: endpoint.responseData }
  );
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-[#111620] border border-[#232a3a] rounded-2xl p-7 w-[480px] max-w-[95vw] shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-base font-semibold text-slate-100">
            {isNew ? "New Endpoint" : "Edit Endpoint"}
          </h3>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-300 transition-colors cursor-pointer bg-transparent border-none p-0">
            <X size={20} />
          </button>
        </div>

        <div className="flex gap-3 mb-4">
          <div className="w-28">
            <label className="block text-xs text-slate-400 mb-1.5">Method</label>
            <select value={form.method} onChange={(e) => set("method", e.target.value)} className={inputCls + " cursor-pointer"}>
              {HTTP_METHODS.map((m) => (
                <option key={m} value={m} className="bg-[#111620]">{m}</option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-xs text-slate-400 mb-1.5">Path</label>
            <input value={form.path} onChange={(e) => set("path", e.target.value)} placeholder="/api/resource" className={inputCls} />
          </div>
        </div>

        <FormField label="Status Code">
          <input type="number" value={form.status} onChange={(e) => set("status", Number(e.target.value))} className={inputCls} />
        </FormField>

        <FormField label="Response Data (JSON)">
          <textarea value={form.responseData} onChange={(e) => set("responseData", e.target.value)} rows={6} placeholder={'{\n  "key": "value"\n}'} className={inputCls + " resize-y leading-relaxed"} />
        </FormField>

        <div className="flex gap-3 justify-end mt-2">
          <button onClick={onClose} className="bg-transparent border border-[#2a3550] rounded-lg px-5 py-2.5 text-slate-400 text-sm cursor-pointer hover:text-slate-200 hover:border-[#3a4560] transition-colors">
            Cancel
          </button>
          <button onClick={() => onSave(form)} className="bg-gradient-to-br from-violet-600 to-violet-800 border-none rounded-lg px-5 py-2.5 text-white text-sm font-semibold cursor-pointer hover:opacity-90 transition-opacity shadow-lg shadow-violet-900/40">
            {isNew ? "Create Endpoint" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── App.jsx ──────────────────────────────────────────────────────────────────

export default function MockAPIManager() {
  const {
    filtered, stats, search, setSearch,
    modal, openNew, openEdit, closeModal,
    saveEndpoint, deleteEndpoint,
  } = useEndpoints();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');
        * { font-family: 'DM Sans', sans-serif; box-sizing: border-box; }
        .font-mono, pre, code { font-family: 'JetBrains Mono', monospace !important; }
      `}</style>

      <div className="min-h-screen bg-[#0a0d14] text-slate-200">
        <div className="max-w-4xl mx-auto px-5 py-8">
          <Header onNewEndpoint={openNew} />
          <SearchBar value={search} onChange={setSearch} />

          <div className="grid grid-cols-3 gap-4 mb-7">
            <StatsCard label="Total Endpoints" value={stats.total} />
            <StatsCard label="GET Requests" value={stats.get} valueColor="text-emerald-400" />
            <StatsCard label="POST Requests" value={stats.post} valueColor="text-blue-400" />
          </div>

          <EndpointList endpoints={filtered} search={search} onEdit={openEdit} onDelete={deleteEndpoint} />
        </div>
      </div>

      {modal && (
        <EndpointModal mode={modal.mode} endpoint={modal.endpoint} onClose={closeModal} onSave={saveEndpoint} />
      )}
    </>
  );
}