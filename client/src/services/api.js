import { API_URL } from "../config/env";

async function handleResponse(response) {
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}

export async function apiGet(path) {
  const response = await fetch(`${API_URL}${path}`);
  return handleResponse(response);
}
