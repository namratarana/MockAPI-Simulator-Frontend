import { useEffect, useState } from "react";
import { countByMethod, filterEndpoints } from "../utils/helpers";
import {
  getAllEndpoints,
  createEndpoint,
  updateEndpoint,
  deleteEndpoint as deleteEndpointAPI,  // renamed to avoid clash with local function
} from "../api";

const useEndpoints = () => {
  const [endpoints, setEndpoints] = useState([]);  // empty array, no more mock data
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // fetch all endpoints from DB when page loads
  useEffect(() => {
    fetchEndpoints();
  }, []);

  const fetchEndpoints = async () => {
    try {
      setLoading(true);
      const response = await getAllEndpoints();
      setEndpoints(response.data);
    } catch (err) {
      setError("Failed to fetch endpoints");
    } finally {
      setLoading(false);
    }
  };

  const filtered = filterEndpoints(endpoints, search);

  const stats = {
    total: endpoints.length,
    get: countByMethod(endpoints, "GET"),
    post: countByMethod(endpoints, "POST"),
  };

  const openNew = () => setModal({ mode: "new" });
  const openEdit = (endpoint) => setModal({ mode: "edit", endpoint });
  const closeModal = () => setModal(null);

  const saveEndpoint = async (form) => {
    try {
      if (modal.mode === "new") {
        await createEndpoint(form);
      } else {
        await updateEndpoint(modal.endpoint.id, form);
      }
      await fetchEndpoints();  // refresh table from DB
      closeModal();
    } catch (err) {
      setError("Failed to save endpoint");
    }
  };

  const deleteEndpoint = async (id) => {
    try {
      await deleteEndpointAPI(id);
      await fetchEndpoints();  // refresh table from DB
    } catch (err) {
      setError("Failed to delete endpoint");
    }
  };

  return {
    filtered,
    stats,
    search,
    setSearch,
    modal,
    openNew,
    openEdit,
    closeModal,
    saveEndpoint,
    deleteEndpoint,
    loading,
    error,
  };
};

export default useEndpoints;