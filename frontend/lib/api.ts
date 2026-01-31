const API = "http://localhost:5000/api";

export const fetchDeals = () =>
  fetch(`${API}/deals`).then(res => res.json());

export const fetchClaims = (token: string) =>
  fetch(`${API}/claims`, {
    headers: { Authorization: `Bearer ${token}` }
  }).then(res => res.json());
