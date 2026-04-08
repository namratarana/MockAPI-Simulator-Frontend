import { useState } from "react";
import { countByMethod, filterEndpoints } from "../utils/helpers";
import { INITIAL_ENDPOINTS } from "../data/constants";

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
    } 
    else {
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

export default useEndpoints;