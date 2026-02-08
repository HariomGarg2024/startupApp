const API = "http://127.0.0.1:5000/api";

const parseJSON = async (res: Response) => {
  const contentType = res.headers.get("content-type");

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "API request failed");
  }

  if (!contentType || !contentType.includes("application/json")) {
    const text = await res.text();
    throw new Error("Expected JSON but got: " + text);
  }

  return res.json();
};

export const fetchDeals = async () => {
  const res = await fetch(`${API}/deals`);
  return parseJSON(res);
};

export const fetchClaims = async (token: string) => {
  const res = await fetch(`${API}/claims`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return parseJSON(res);
};
