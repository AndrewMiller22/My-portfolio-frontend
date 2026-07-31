import { useEffect, useState } from "react";
import { deleteItem, getItems } from "../../services/api";

function UserList({ refreshKey, onEdit, onCountChange }) {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadUsers() {
      try {
        const result = await getItems("users");
        setUsers(result.data);
        onCountChange(result.data.length);
        setError("");
      } catch (loadError) {
        setError(loadError.message);
      }
    }

    loadUsers();
  }, [refreshKey, onCountChange]);

  async function handleDelete(id) {
    if (!window.confirm("Delete this user?")) return;

    try {
      await deleteItem("users", id);
      const remainingUsers = users.filter((user) => user.id !== id);
      setUsers(remainingUsers);
      onCountChange(remainingUsers.length);
    } catch (deleteError) {
      setError(deleteError.message);
    }
  }

  return (
    <section className="admin-panel">
      <h2>User List</h2>
      {error && <p className="error-message">{error}</p>}

      <div className="table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.firstname} {user.lastname}</td>
                <td>{user.email}</td>
                <td className="table-actions">
                  <button type="button" onClick={() => onEdit(user)}>Edit</button>
                  <button type="button" onClick={() => handleDelete(user.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {!error && users.length === 0 && (
              <tr>
                <td colSpan="3">No users have been added yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default UserList;
