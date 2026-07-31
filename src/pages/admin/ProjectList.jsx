import { useEffect, useState } from "react";
import { deleteItem, getItems } from "../../services/api";

function ProjectList({ refreshKey, onEdit, onCountChange }) {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProjects() {
      try {
        const result = await getItems("projects");
        setProjects(result.data);
        onCountChange(result.data.length);
        setError("");
      } catch (loadError) {
        setError(loadError.message);
      }
    }
    loadProjects();
  }, [refreshKey, onCountChange]);

  async function handleDelete(id) {
    if (!window.confirm("Delete this project?")) return;
    try {
      await deleteItem("projects", id);
      const remaining = projects.filter((project) => project.id !== id);
      setProjects(remaining);
      onCountChange(remaining.length);
    } catch (deleteError) {
      setError(deleteError.message);
    }
  }

  return (
    <section className="admin-panel">
      <h2>Project List</h2>
      {error && <p className="error-message">{error}</p>}

      <div className="admin-card-grid">
        {projects.map((project) => (
          <article className="admin-item-card" key={project.id}>
            {project.image && (
              <img src={project.image} alt={`${project.title} preview`} />
            )}
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <p className="muted">
              Completed: {new Date(project.completion).toLocaleDateString()}
            </p>
            <div className="table-actions">
              <button type="button" onClick={() => onEdit(project)}>Edit</button>
              <button type="button" onClick={() => handleDelete(project.id)}>
                Delete
              </button>
            </div>
          </article>
        ))}
        {!error && projects.length === 0 && <p>No projects added yet.</p>}
      </div>
    </section>
  );
}

export default ProjectList;
