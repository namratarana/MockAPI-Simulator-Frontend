const StatsCard = ({ label, value, valueColor = "text-slate-100" }) => (
    <div className="bg-[#111620] border border-[#1e2740] rounded-xl px-6 py-5">
        <p className={`text-sm font-medium mb-2 ${valueColor === "text-slate-100" ? "text-slate-400" : valueColor}`}>
            {label}
        </p>
        <p className={`text-4xl font-bold leading-none ${valueColor}`}>{value}</p>
    </div>
);

export default StatsCard;