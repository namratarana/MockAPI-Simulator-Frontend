import EndpointList from "./components/EndpointList";
import EndpointModal from "./components/EndpointModal";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import StatsCard from "./components/StatsCard";
import useEndpoints from "./hooks/useEndpoints";

export default function App() {
  const {filtered, stats, search, setSearch, modal, openNew, openEdit, closeModal,saveEndpoint, deleteEndpoint,} = useEndpoints();

  
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