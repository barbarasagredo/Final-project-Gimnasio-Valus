import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getUsers, getReviews, deleteReview, getProducts, getAllProducts, createProduct, updateProduct, deleteProduct, toggleProduct } from "../../services/api";
import { Navigate } from "react-router-dom";

const AdminPage = () => {
  const { user, token } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("users");

  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({ name: "", price: "", image: "" });
  const [showForm, setShowForm] = useState(false);

  if (!user || user.role !== "admin") {
    return <Navigate to="/" />;
  }

  useEffect(() => {
    fetchUsers();
    fetchReviews();
    fetchProducts();
  }, []);

  const fetchUsers = async () => {
    const data = await getUsers(token);
    setUsers(data);
  };

  const fetchReviews = async () => {
    const data = await getReviews();
    setReviews(data);
  };

const fetchProducts = async () => {
  const data = await getAllProducts(token);
  if (Array.isArray(data)) setProducts(data);
};

  const handleDeleteReview = async (id) => {
    if (!confirm("¿Estás seguro de eliminar esta reseña?")) return;
    await deleteReview(id, token);
    setReviews(reviews.filter((r) => r.id !== id));
  };

  const handleDeleteProduct = async (id) => {
    if (!confirm("¿Estás seguro de eliminar este producto?")) return;
    await deleteProduct(id, token);
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleToggleProduct = async (id) => {
    const updated = await toggleProduct(id, token);
    setProducts(products.map((p) => p.id === id ? updated : p));
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product.id);
    setProductForm({ name: product.name, price: product.price, image: product.image });
    setShowForm(true);
  };

  const handleNewProduct = () => {
    setEditingProduct(null);
    setProductForm({ name: "", price: "", image: "" });
    setShowForm(true);
  };

  const handleSubmitProduct = async () => {
    if (!productForm.name || !productForm.price) return;
    if (editingProduct) {
      const updated = await updateProduct(editingProduct, productForm, token);
      setProducts(products.map((p) => p.id === editingProduct ? updated : p));
    } else {
      const created = await createProduct(productForm, token);
      setProducts([...products, created]);
    }
    setShowForm(false);
    setEditingProduct(null);
    setProductForm({ name: "", price: "", image: "" });
  };

  const inputStyle = {
    width: "100%", padding: "8px 10px", borderRadius: "6px",
    border: "1px solid #ddd", marginBottom: "0.5rem",
    fontSize: "0.9rem", boxSizing: "border-box"
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <h1>Panel de Administración</h1>

      <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
        {["users", "reviews", "products"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "0.5rem 1.5rem",
              background: activeTab === tab ? "#333" : "#eee",
              color: activeTab === tab ? "#fff" : "#333",
              border: "none", borderRadius: "6px", cursor: "pointer",
            }}
          >
            {tab === "users" && `Usuarios (${users.length})`}
            {tab === "reviews" && `Reseñas (${reviews.length})`}
            {tab === "products" && `Productos (${products.length})`}
          </button>
        ))}
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
                    <span style={{
                      padding: "2px 8px", borderRadius: "4px",
                      background: u.role === "admin" ? "#333" : "#e0e0e0",
                      color: u.role === "admin" ? "#fff" : "#333",
                      fontSize: "0.8rem",
                    }}>
                      {u.role}
                    </span>
                  </td>
                  <td style={td}>{new Date(u.created_at).toLocaleDateString()}</td>
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
                  <td style={td}>{new Date(r.created_at).toLocaleDateString()}</td>
                  <td style={td}>
                    <button
                      onClick={() => handleDeleteReview(r.id)}
                      style={{ background: "#e53e3e", color: "#fff", border: "none", borderRadius: "4px", padding: "4px 10px", cursor: "pointer" }}
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

      {activeTab === "products" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h2>Productos</h2>
            <button
              onClick={handleNewProduct}
              style={{ background: "#333", color: "#fff", border: "none", borderRadius: "6px", padding: "8px 16px", cursor: "pointer" }}
            >
              + Nuevo producto
            </button>
          </div>

          {showForm && (
            <div style={{ background: "#f9f9f9", borderRadius: "8px", padding: "1rem", marginBottom: "1.5rem", border: "1px solid #ddd" }}>
              <h4 style={{ marginBottom: "0.8rem", color: "#333" }}>
                {editingProduct ? "Editar producto" : "Nuevo producto"}
              </h4>
              <input
                style={inputStyle}
                placeholder="Nombre"
                value={productForm.name}
                onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
              />
              <input
                style={inputStyle}
                placeholder="Precio (ej: $2.000)"
                value={productForm.price}
                onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
              />
              <input
                style={inputStyle}
                placeholder="Ruta imagen (ej: /src/assets/imgs/tienda1.avif)"
                value={productForm.image}
                onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
              />
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button
                  onClick={handleSubmitProduct}
                  style={{ background: "#333", color: "#fff", border: "none", borderRadius: "6px", padding: "8px 16px", cursor: "pointer" }}
                >
                  {editingProduct ? "Guardar cambios" : "Crear producto"}
                </button>
                <button
                  onClick={() => { setShowForm(false); setEditingProduct(null); }}
                  style={{ background: "#eee", color: "#333", border: "none", borderRadius: "6px", padding: "8px 16px", cursor: "pointer" }}
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}

          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f5f5f5", color: "#333" }}>
                <th style={th}>ID</th>
                <th style={th}>Nombre</th>
                <th style={th}>Precio</th>
                <th style={th}>Imagen</th>
                <th style={th}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={td}>{p.id}</td>
                  <td style={td}>{p.name}</td>
                  <td style={td}>{p.price}</td>
                  <td style={td}>
                    <img src={p.image} alt={p.name} style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "4px" }} />
                  </td>
                  <td style={td}>
                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                      <button
                        onClick={() => handleToggleProduct(p.id)}
                        style={{
                          background: p.active ? "#33af50" : "#969696",
                          color: "#fff",
                          border: "none",
                          borderRadius: "4px",
                          padding: "4px 10px",
                          cursor: "pointer",
                          fontSize: "0.8rem"
                        }}
                      >
                        {p.active ? "Activo" : "Inactivo"}
                      </button>
                      <button
                        onClick={() => handleEditProduct(p)}
                        style={{ background: "#333", color: "#fff", border: "none", borderRadius: "4px", padding: "4px 10px", cursor: "pointer" }}
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(p.id)}
                        style={{ background: "#e53e3e", color: "#fff", border: "none", borderRadius: "4px", padding: "4px 10px", cursor: "pointer" }}
                      >
                        Eliminar
                      </button>
                    </div>
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