import { useCallback, useEffect, useState } from "react";
import { getItems } from "../../services/api";
import ProjectForm from "./ProjectForm";
import ProjectList from "./ProjectList";
import ReferenceForm from "./ReferenceForm";
import ReferencesList from "./ReferencesList";
import ServiceForm from "./ServiceForm";
import ServicesList from "./ServicesList";
import UserForm from "./UserForm";
import UserList from "./UserList";

const sections = ["users", "projects", "services", "references"];

function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("users");
  const [refreshKeys, setRefreshKeys] = useState({
    users: 0,
    projects: 0,
    services: 0,
    references: 0,
  });
  const [counts, setCounts] = useState({
    users: 0,
    projects: 0,
    services: 0,
    references: 0,
  });
  const [editing, setEditing] = useState({
    users: null,
    projects: null,
    services: null,
    references: null,
  });

  useEffect(() => {
    async function loadCounts() {
      const results = await Promise.allSettled(
        sections.map((section) => getItems(section)),
      );

      setCounts((current) => {
        const nextCounts = { ...current };
        results.forEach((result, index) => {
          if (result.status === "fulfilled") {
            nextCounts[sections[index]] = result.value.data.length;
          }
        });
        return nextCounts;
      });
    }

    loadCounts();
  }, []);

  const updateCount = useCallback((section, count) => {
    setCounts((current) => ({ ...current, [section]: count }));
  }, []);

  const updateUserCount = useCallback(
    (count) => updateCount("users", count),
    [updateCount],
  );
  const updateProjectCount = useCallback(
    (count) => updateCount("projects", count),
    [updateCount],
  );
  const updateServiceCount = useCallback(
    (count) => updateCount("services", count),
    [updateCount],
  );
  const updateReferenceCount = useCallback(
    (count) => updateCount("references", count),
    [updateCount],
  );

  function finishSave(section) {
    setEditing((current) => ({ ...current, [section]: null }));
    setRefreshKeys((current) => ({
      ...current,
      [section]: current[section] + 1,
    }));
  }

  function cancelEdit(section) {
    setEditing((current) => ({ ...current, [section]: null }));
  }

  return (
    <section className="admin-dashboard">
      <aside className="admin-sidebar">
        <div>
          <p className="eyebrow">Portfolio administration</p>
          <h1>Admin Dashboard</h1>
        </div>

        <nav aria-label="Dashboard sections">
          {sections.map((section) => (
            <button
              className={activeSection === section ? "active" : ""}
              key={section}
              type="button"
              onClick={() => setActiveSection(section)}
            >
              {section[0].toUpperCase() + section.slice(1)}
            </button>
          ))}
        </nav>
      </aside>

      <div className="admin-content">
        <header className="admin-heading">
          <div>
            <h2>Dashboard overview</h2>
            <p>Manage the information stored in your portfolio database.</p>
          </div>
        </header>

        <div className="stat-grid">
          {sections.map((section) => (
            <article className="stat-card" key={section}>
              <span>{section[0].toUpperCase() + section.slice(1)}</span>
              <strong>{counts[section]}</strong>
            </article>
          ))}
        </div>

        {activeSection === "users" && (
          <>
            <UserForm
              key={editing.users?.id || "new-user"}
              editingUser={editing.users}
              onSaved={() => finishSave("users")}
              onCancel={() => cancelEdit("users")}
            />
            <UserList
              refreshKey={refreshKeys.users}
              onEdit={(user) =>
                setEditing((current) => ({ ...current, users: user }))
              }
              onCountChange={updateUserCount}
            />
          </>
        )}

        {activeSection === "projects" && (
          <>
            <ProjectForm
              key={editing.projects?.id || "new-project"}
              editingProject={editing.projects}
              onSaved={() => finishSave("projects")}
              onCancel={() => cancelEdit("projects")}
            />
            <ProjectList
              refreshKey={refreshKeys.projects}
              onEdit={(project) =>
                setEditing((current) => ({ ...current, projects: project }))
              }
              onCountChange={updateProjectCount}
            />
          </>
        )}

        {activeSection === "services" && (
          <>
            <ServiceForm
              key={editing.services?.id || "new-service"}
              editingService={editing.services}
              onSaved={() => finishSave("services")}
              onCancel={() => cancelEdit("services")}
            />
            <ServicesList
              refreshKey={refreshKeys.services}
              onEdit={(service) =>
                setEditing((current) => ({ ...current, services: service }))
              }
              onCountChange={updateServiceCount}
            />
          </>
        )}

        {activeSection === "references" && (
          <>
            <ReferenceForm
              key={editing.references?.id || "new-reference"}
              editingReference={editing.references}
              onSaved={() => finishSave("references")}
              onCancel={() => cancelEdit("references")}
            />
            <ReferencesList
              refreshKey={refreshKeys.references}
              onEdit={(reference) =>
                setEditing((current) => ({
                  ...current,
                  references: reference,
                }))
              }
              onCountChange={updateReferenceCount}
            />
          </>
        )}
      </div>
    </section>
  );
}

export default AdminDashboard;
