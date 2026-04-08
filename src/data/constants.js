
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


export { INITIAL_ENDPOINTS, HTTP_METHODS, METHOD_STYLES };