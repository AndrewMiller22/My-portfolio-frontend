import { useEffect, useState } from "react";
import { deleteItem, getItems } from "../../services/api";

function ServicesList({ refreshKey, onEdit, onCountChange }) {
  const [services, setServices] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadServices() {
      try {
        const result = await getItems("services");
        setServices(result.data);
        onCountChange(result.data.length);
        setError("");
      } catch (loadError) {
        setError(loadError.message);
      }
    }
    loadServices();
  }, [refreshKey, onCountChange]);

  async function handleDelete(id) {
    if (!window.confirm("Delete this service?")) return;
    try {
      await deleteItem("services", id);
      const remaining = services.filter((service) => service.id !== id);
      setServices(remaining);
      onCountChange(remaining.length);
    } catch (deleteError) {
      setError(deleteError.message);
    }
  }

  return (
    <section className="admin-panel">
      <h2>Service List</h2>
      {error && <p className="error-message">{error}</p>}

      <div className="admin-card-grid">
        {services.map((service) => (
          <article className="admin-item-card" key={service.id}>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <div className="table-actions">
              <button type="button" onClick={() => onEdit(service)}>Edit</button>
              <button type="button" onClick={() => handleDelete(service.id)}>
                Delete
              </button>
            </div>
          </article>
        ))}
        {!error && services.length === 0 && <p>No services added yet.</p>}
      </div>
    </section>
  );
}

export default ServicesList;
