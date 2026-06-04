import { useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { createOrder } from "../../services/api";
import "../../styles/Auth.css";
import Button from "../common/Button";

const CheckoutPage = () => {
  const { user, token } = useContext(AuthContext);
  const { cart, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [tipo, setTipo] = useState("");
  const [direccion, setDireccion] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const ordered = useRef(false);

  if (!user) {
    navigate("/login");
    return null;
  }

  if (cart.length === 0 && !ordered.current) {
    navigate("/");
    return null;
  }

  const handleSubmit = async () => {
    if (!tipo) {
      setError("Debes seleccionar retiro o despacho");
      return;
    }
    if (tipo === "despacho" && !direccion.trim()) {
      setError("Debes ingresar una dirección de despacho");
      return;
    }
    setLoading(true);
    const data = await createOrder(
      {
        tipo,
        direccion: tipo === "despacho" ? direccion : null,
        total: `$${total.toLocaleString("es-CL")}`,
        items: cart.map((p) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          quantity: p.quantity,
        })),
      },
      token
    );
    setLoading(false);
    if (data.order) {
      ordered.current = true;
      clearCart();
      navigate("/order-success");
    } else {
      setError("Error al procesar la orden");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card" style={{ maxWidth: "500px" }}>
        <p style={{ color: "#e07b20", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 10, fontSize: "0.85rem" }}>
          Carrito de compra
        </p>
        <h3 className="auth-title">Resumen de tu orden</h3>

        <div style={{ width: "100%", marginBottom: "1rem" }}>
          {cart.map((p) => {
            const price = parseInt(p.price.replace(/\D/g, ""));
            return (
              <div key={p.id} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.1)", color: "#fff", fontSize: "0.9rem" }}>
                <span>{p.name} x{p.quantity}</span>
                <span>${(price * p.quantity).toLocaleString("es-CL")}</span>
              </div>
            );
          })}
          <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", color: "#e07b20", fontWeight: "bold" }}>
            <span>Total</span>
            <span>${total.toLocaleString("es-CL")}</span>
          </div>
        </div>

        <p style={{ color: "#ccc", fontSize: "0.85rem", marginBottom: "0.5rem", alignSelf: "flex-start" }}>
          Selecciona el tipo de entrega:
        </p>
        <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem", width: "100%" }}>
          <button
            onClick={() => setTipo("retiro")}
            style={{
              flex: 1, padding: "0.6rem", borderRadius: "6px",
              border: tipo === "retiro" ? "2px solid #e07b20" : "2px solid transparent",
              background: tipo === "retiro" ? "#e07b20" : "rgba(255,255,255,0.1)",
              color: "#fff", cursor: "pointer", fontWeight: tipo === "retiro" ? "bold" : "normal"
            }}
          >
            Retiro en tienda
          </button>
          <button
            onClick={() => setTipo("despacho")}
            style={{
              flex: 1, padding: "0.6rem", borderRadius: "6px",
              border: tipo === "despacho" ? "2px solid #e07b20" : "2px solid transparent",
              background: tipo === "despacho" ? "#e07b20" : "rgba(255,255,255,0.1)",
              color: "#fff", cursor: "pointer", fontWeight: tipo === "despacho" ? "bold" : "normal"
            }}
          >
            Despacho a domicilio
          </button>
        </div>

        {tipo === "despacho" && (
          <input
            type="text"
            placeholder="Ingresa tu dirección"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.08)", color: "#fff", fontSize: "0.85rem", marginBottom: "1rem", boxSizing: "border-box" }}
          />
        )}

        {error && <p style={{ color: "#ff6b6b", fontSize: "0.85rem" }}>{error}</p>}

        <div style={{ width: "100%", opacity: !tipo ? 0.5 : 1, cursor: !tipo ? "not-allowed" : "pointer" }}>
          <Button
            className="cta-button"
            onClick={!tipo ? undefined : handleSubmit}
            text={loading ? "Procesando..." : "Confirmar orden"}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;