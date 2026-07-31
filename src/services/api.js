const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "The request could not be completed.");
  }

  return result;
}

export function getItems(resource) {
  return apiRequest(`/${resource}`);
}

export function createItem(resource, data) {
  return apiRequest(`/${resource}`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateItem(resource, id, data) {
  return apiRequest(`/${resource}/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function deleteItem(resource, id) {
  return apiRequest(`/${resource}/${id}`, {
    method: "DELETE",
  });
}
