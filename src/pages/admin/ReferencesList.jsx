import { useEffect, useState } from "react";
import { deleteItem, getItems } from "../../services/api";

function ReferencesList({ refreshKey, onEdit, onCountChange }) {
  const [references, setReferences] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadReferences() {
      try {
        const result = await getItems("references");
        setReferences(result.data);
        onCountChange(result.data.length);
        setError("");
      } catch (loadError) {
        setError(loadError.message);
      }
    }
    loadReferences();
  }, [refreshKey, onCountChange]);

  async function handleDelete(id) {
    if (!window.confirm("Delete this reference?")) return;
    try {
      await deleteItem("references", id);
      const remaining = references.filter((reference) => reference.id !== id);
      setReferences(remaining);
      onCountChange(remaining.length);
    } catch (deleteError) {
      setError(deleteError.message);
    }
  }

  return (
    <section className="admin-panel">
      <h2>Reference List</h2>
      {error && <p className="error-message">{error}</p>}

      <div className="admin-card-grid">
        {references.map((reference) => (
          <article className="admin-item-card" key={reference.id}>
            <h3>{reference.name}</h3>
            <p className="muted">{reference.position}, {reference.company}</p>
            <p>“{reference.testimonial}”</p>
            <div className="table-actions">
              <button type="button" onClick={() => onEdit(reference)}>Edit</button>
              <button type="button" onClick={() => handleDelete(reference.id)}>
                Delete
              </button>
            </div>
          </article>
        ))}
        {!error && references.length === 0 && <p>No references added yet.</p>}
      </div>
    </section>
  );
}

export default ReferencesList;
