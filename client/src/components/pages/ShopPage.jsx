import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { getProducts } from "../../services/api";
import { useEffect } from "react";
import "../../styles/Shop.css";

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const { cart, addToCart, removeFromCart, updateQuantity, total } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      if (Array.isArray(data)) setProducts(data);
    };
    fetchProducts();
  }, []);

  const cartCount = cart.reduce((sum, p) => sum + p.quantity, 0);

  return (
    <section className="shop-section">
      <h4 className="shop-subtitle">Tienda</h4>
      <p className="shop-description">
        Disponible de manera presencial, consulta disponibilidad.
      </p>

      {/* Carrito */}
      {cart.length > 0 && (
        <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: "12px", padding: "1rem", marginBottom: "2rem", maxWidth: "600px", margin: "0 auto 2rem" }}>
          <h4 style={{ color: "#e07b20", marginBottom: "0.5rem" }}>🛒 Carrito ({cartCount} productos)</h4>
          {cart.map((p) => {
            const price = parseInt(p.price.replace(/\D/g, ""));
            return (
              <div key={p.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.1)", color: "#fff", fontSize: "0.9rem" }}>
                <span style={{ flex: 1 }}>{p.name}</span>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <button onClick={() => updateQuantity(p.id, p.quantity - 1)} style={{ background: "#333", color: "#fff", border: "none", borderRadius: "4px", width: "24px", height: "24px", cursor: "pointer" }}>-</button>
                  <span>{p.quantity}</span>
                  <button onClick={() => updateQuantity(p.id, p.quantity + 1)} style={{ background: "#333", color: "#fff", border: "none", borderRadius: "4px", width: "24px", height: "24px", cursor: "pointer" }}>+</button>
                </div>
                <span style={{ width: "80px", textAlign: "right" }}>${(price * p.quantity).toLocaleString("es-CL")}</span>
                <button onClick={() => removeFromCart(p.id)} style={{ background: "#e53e3e", color: "#fff", border: "none", borderRadius: "4px", padding: "2px 8px", cursor: "pointer", marginLeft: "8px" }}>✕</button>
              </div>
            );
          })}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1rem" }}>
            <span style={{ color: "#e07b20", fontWeight: "bold" }}>Total: ${total.toLocaleString("es-CL")}</span>
            <button
              onClick={() => navigate("/checkout")}
              style={{ background: "#e07b20", color: "#fff", border: "none", borderRadius: "6px", padding: "8px 20px", cursor: "pointer", fontWeight: "bold" }}
            >
              Finalizar compra
            </button>
          </div>
        </div>
      )}

      {/* Productos */}
      <div className="shop-grid">
        {products.map((product) => (
          <div key={product.id} className="shop-card" style={{ position: "relative" }}>
            <img src={product.image} alt={product.name} />
            <div className="shop-card-overlay">
              <h3 className="shop-card-name">{product.name}</h3>
              <p className="shop-card-price">{product.price}</p>
              <button
                onClick={() => addToCart(product)}
                style={{ marginTop: "8px", background: "#e07b20", color: "#fff", border: "none", borderRadius: "6px", padding: "6px 16px", cursor: "pointer", fontWeight: "bold" }}
              >
                + Agregar
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShopPage;