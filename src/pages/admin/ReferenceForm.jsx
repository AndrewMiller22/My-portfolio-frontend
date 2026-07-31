import { useState } from "react";
import { createItem, updateItem } from "../../services/api";

const emptyReference = {
  name: "",
  position: "",
  company: "",
  testimonial: "",
};

function ReferenceForm({ editingReference, onSaved, onCancel }) {
  const [formData, setFormData] = useState(() =>
    editingReference
      ? {
          name: editingReference.name,
          position: editingReference.position,
          company: editingReference.company,
          testimonial: editingReference.testimonial,
        }
      : emptyReference,
  );
  const [message, setMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    try {
      if (editingReference) {
        await updateItem("references", editingReference.id, formData);
      } else {
        await createItem("references", formData);
      }
      setFormData(emptyReference);
      setMessage(editingReference ? "Reference updated." : "Reference created.");
      onSaved();
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <h2>{editingReference ? "Edit Reference" : "Add Reference"}</h2>

      <div className="form-grid">
        <label>
          Name
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Position
          <input
            name="position"
            type="text"
            value={formData.position}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Company
          <input
            name="company"
            type="text"
            value={formData.company}
            onChange={handleChange}
            required
          />
        </label>

        <label className="full-width">
          Testimonial
          <textarea
            name="testimonial"
            value={formData.testimonial}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <div className="form-actions">
        <button className="primary-button" type="submit">Save Reference</button>
        {editingReference && (
          <button className="secondary-button" type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>

      {message && <p className="form-message">{message}</p>}
    </form>
  );
}

export default ReferenceForm;
