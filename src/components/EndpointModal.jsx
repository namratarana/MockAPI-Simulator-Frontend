import React, { useState } from "react";
import { X } from "lucide-react";
import { HTTP_METHODS } from "../data/constants";

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
        ? { method: "GET", url: "", status: 200, responseData: "" }
        : { method: endpoint.method, url: endpoint.url, status: endpoint.status, responseData: endpoint.data }
    );
    const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

    return (
    <div
        className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"
        onClick={(e) => e.target === e.currentTarget && onClose()}
    >
        <div className="bg-[#111620] border border-[#232a3a] rounded-2xl p-7 w-[480px] max-w-[95vw] shadow-2xl">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-base font-semibold text-slate-100"> {isNew ? "New Endpoint" : "Edit Endpoint"} </h3>
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
                    <label className="block text-xs text-slate-400 mb-1.5">URL</label>
                    <input value={form.url} onChange={(e) => set("url", e.target.value)} placeholder="/api/resource" className={inputCls} />
                </div>
            </div>

            <FormField label="Status Code">
                <input type="number" value={form.status} onChange={(e) => set("status", Number(e.target.value))} className={inputCls} />
            </FormField>

            <FormField label="Response Data (JSON)">
                <textarea value={form.responseData} onChange={(e) => set("responseData", e.target.value)} rows={6} placeholder={'{\n  "key": "value"\n}'} className={inputCls + " resize-y leading-relaxed"} />
            </FormField>

            <div className="flex gap-3 justify-end mt-2">
                <button onClick={onClose} className="bg-transparent border border-[#2a3550] rounded-lg px-5 py-2.5 text-slate-400 text-sm cursor-pointer hover:text-slate-200 hover:border-[#3a4560] transition-colors">Cancel</button>
                <button onClick={() => onSave(form)} className="bg-gradient-to-br from-violet-600 to-violet-800 border-none rounded-lg px-5 py-2.5 text-white text-sm font-semibold cursor-pointer hover:opacity-90 transition-opacity shadow-lg shadow-violet-900/40">{isNew ? "Create Endpoint" : "Save Changes"}</button>
            </div>
        </div>
    </div>
    );
};

export default EndpointModal;