const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const registerUser = async (name, email, password) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  return res.json();
};

export const loginUser = async (email, password) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
};

export const getReviews = async () => {
  const res = await fetch(`${API_URL}/reviews`);
  return res.json();
};

export const createReview = async (rating, comment, token) => {
  const res = await fetch(`${API_URL}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ rating, comment }),
  });
  return res.json();
};

export const deleteReview = async (id, token) => {
  const res = await fetch(`${API_URL}/reviews/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

export const getUsers = async (token) => {
  const res = await fetch(`${API_URL}/admin/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

export const getProducts = async () => {
  const res = await fetch(`${API_URL}/products`);
  return res.json();
};

export const createOrder = async (order, token) => {
  const res = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(order),
  });
  return res.json();
};

export const getMyOrders = async (token) => {
  const res = await fetch(`${API_URL}/orders/my-orders`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};