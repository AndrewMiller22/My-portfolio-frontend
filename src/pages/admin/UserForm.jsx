import { useState } from "react";
import { createItem, updateItem } from "../../services/api";

const emptyUser = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
};

function UserForm({ editingUser, onSaved, onCancel }) {
  const [formData, setFormData] = useState(() =>
    editingUser
      ? {
          firstname: editingUser.firstname,
          lastname: editingUser.lastname,
          email: editingUser.email,
          password: "",
        }
      : emptyUser,
  );
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSaving(true);
    setMessage("");

    try {
      const payload = { ...formData };
      if (editingUser && !payload.password) {
        delete payload.password;
      }

      if (editingUser) {
        await updateItem("users", editingUser.id, payload);
      } else {
        await createItem("users", payload);
      }

      setFormData(emptyUser);
      setMessage(editingUser ? "User updated." : "User created.");
      onSaved();
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <h2>{editingUser ? "Edit User" : "Add User"}</h2>

      <div className="form-grid">
        <label>
          First name
          <input
            name="firstname"
            type="text"
            value={formData.firstname}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Last name
          <input
            name="lastname"
            type="text"
            value={formData.lastname}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Password {editingUser && "(leave blank to keep current password)"}
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required={!editingUser}
          />
        </label>
      </div>

      <div className="form-actions">
        <button className="primary-button" type="submit" disabled={isSaving}>
          {isSaving ? "Saving..." : "Save User"}
        </button>
        {editingUser && (
          <button className="secondary-button" type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>

      {message && <p className="form-message">{message}</p>}
    </form>
  );
}

export default UserForm;
