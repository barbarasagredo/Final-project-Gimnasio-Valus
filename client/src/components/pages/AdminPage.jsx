import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getUsers, getReviews, deleteReview } from "../../services/api";
import { Navigate } from "react-router-dom";

const AdminPage = () => {
  const { user, token } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [activeTab, setActiveTab] = useState("users");

  if (!user || user.role !== "admin") {
    return <Navigate to="/" />;
  }

  useEffect(() => {
    fetchUsers();
    fetchReviews();
  }, []);

  const fetchUsers = async () => {
    const data = await getUsers(token);
    setUsers(data);
  };

  const fetchReviews = async () => {
    const data = await getReviews();
    setReviews(data);
  };

  const handleDeleteReview = async (id) => {
    if (!confirm("¿Estás seguro de eliminar esta reseña?")) return;
    await deleteReview(id, token);
    setReviews(reviews.filter((r) => r.id !== id));
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <h1>Panel de Administración</h1>

      <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
        <button
          onClick={() => setActiveTab("users")}
          style={{
            padding: "0.5rem 1.5rem",
            background: activeTab === "users" ? "#333" : "#eee",
            color: activeTab === "users" ? "#fff" : "#333",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Usuarios ({users.length})
        </button>
        <button
          onClick={() => setActiveTab("reviews")}
          style={{
            padding: "0.5rem 1.5rem",
            background: activeTab === "reviews" ? "#333" : "#eee",
            color: activeTab === "reviews" ? "#fff" : "#333",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Reseñas ({reviews.length})
        </button>
      </div>

      {activeTab === "users" && (
        <div>
          <h2>Todos los usuarios</h2>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f5f5f5", color: "#333" }}>
                <th style={th}>ID</th>
                <th style={th}>Nombre</th>
                <th style={th}>Email</th>
                <th style={th}>Rol</th>
                <th style={th}>Registro</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={td}>{u.id}</td>
                  <td style={td}>{u.name}</td>
                  <td style={td}>{u.email}</td>
                  <td style={td}>
                    <span
                      style={{
                        padding: "2px 8px",
                        borderRadius: "4px",
                        background: u.role === "admin" ? "#333" : "#e0e0e0",
                        color: u.role === "admin" ? "#fff" : "#333",
                        fontSize: "0.8rem",
                      }}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td style={td}>
                    {new Date(u.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "reviews" && (
        <div>
          <h2>Todas las reseñas</h2>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f5f5f5", color: "#333" }}>
                <th style={th}>Usuario</th>
                <th style={th}>Rating</th>
                <th style={th}>Comentario</th>
                <th style={th}>Fecha</th>
                <th style={th}>Acción</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((r) => (
                <tr key={r.id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={td}>{r.name}</td>
                  <td style={td}>{"⭐".repeat(r.rating)}</td>
                  <td style={td}>{r.comment}</td>
                  <td style={td}>
                    {new Date(r.created_at).toLocaleDateString()}
                  </td>
                  <td style={td}>
                    <button
                      onClick={() => handleDeleteReview(r.id)}
                      style={{
                        background: "#e53e3e",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        padding: "4px 10px",
                        cursor: "pointer",
                      }}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const th = { padding: "10px", textAlign: "left", fontWeight: "bold" };
const td = { padding: "10px" };

export default AdminPage;
