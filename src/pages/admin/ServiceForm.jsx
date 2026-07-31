import { useState } from "react";
import { createItem, updateItem } from "../../services/api";

const emptyService = { title: "", description: "" };

function ServiceForm({ editingService, onSaved, onCancel }) {
  const [formData, setFormData] = useState(() =>
    editingService
      ? {
          title: editingService.title,
          description: editingService.description,
        }
      : emptyService,
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
      if (editingService) {
        await updateItem("services", editingService.id, formData);
      } else {
        await createItem("services", formData);
      }
      setFormData(emptyService);
      setMessage(editingService ? "Service updated." : "Service created.");
      onSaved();
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <h2>{editingService ? "Edit Service" : "Add Service"}</h2>

      <div className="form-grid">
        <label>
          Service title
          <input
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </label>

        <label className="full-width">
          Description
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <div className="form-actions">
        <button className="primary-button" type="submit">Save Service</button>
        {editingService && (
          <button className="secondary-button" type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>

      {message && <p className="form-message">{message}</p>}
    </form>
  );
}

export default ServiceForm;
