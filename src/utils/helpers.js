
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

export { getNow, getStatusColor, filterEndpoints, countByMethod };