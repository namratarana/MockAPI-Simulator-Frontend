import EndpointCard from "./EndpointCard";

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

export default EndpointList;