import { useState } from "react";
import { createItem, updateItem } from "../../services/api";

const emptyProject = {
  title: "",
  completion: "",
  description: "",
  image: "",
};

function ProjectForm({ editingProject, onSaved, onCancel }) {
  const [formData, setFormData] = useState(() =>
    editingProject
      ? {
          title: editingProject.title,
          completion: editingProject.completion?.slice(0, 10) || "",
          description: editingProject.description,
          image: editingProject.image,
        }
      : emptyProject,
  );
  const [message, setMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  function handleImageChange(event) {
    const selectedImage = event.target.files[0];
    if (!selectedImage) return;

    const reader = new FileReader();
    reader.onload = () => {
      setFormData((current) => ({ ...current, image: reader.result }));
    };
    reader.readAsDataURL(selectedImage);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    try {
      if (editingProject) {
        await updateItem("projects", editingProject.id, formData);
      } else {
        await createItem("projects", formData);
      }
      setFormData(emptyProject);
      setMessage(editingProject ? "Project updated." : "Project created.");
      onSaved();
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <h2>{editingProject ? "Edit Project" : "Create Project"}</h2>

      <div className="form-grid">
        <label>
          Project name
          <input
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Completion date
          <input
            name="completion"
            type="date"
            value={formData.completion}
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

        <label className="full-width">
          Project image
          <input
            name="imageFile"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required={!editingProject && !formData.image}
          />
        </label>
      </div>

      {formData.image && (
        <img className="image-preview" src={formData.image} alt="Project preview" />
      )}

      <div className="form-actions">
        <button className="primary-button" type="submit">Save Project</button>
        {editingProject && (
          <button className="secondary-button" type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>

      {message && <p className="form-message">{message}</p>}
    </form>
  );
}

export default ProjectForm;
