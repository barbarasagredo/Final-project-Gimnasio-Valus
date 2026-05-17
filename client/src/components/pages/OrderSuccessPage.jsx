import { useNavigate } from "react-router-dom";
import Button from "../common/Button";

const OrderSuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="auth-container">
      <div className="auth-card" style={{ maxWidth: "500px", textAlign: "center" }}>
        <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🎉</div>
        <p style={{ color: "#e07b20", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 10, fontSize: "0.85rem" }}>
          ¡Orden confirmada!
        </p>
        <h3 className="auth-title">Gracias por tu compra</h3>
        <p style={{ color: "#ccc", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
          Tu pedido ha sido recibido exitosamente. Nos pondremos en contacto contigo pronto para coordinar la entrega o el retiro.
        </p>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", marginBottom: "2rem" }}>
          ¿Tienes dudas? Escríbenos y te ayudamos.
        </p>
        <Button
          className="cta-button"
          onClick={() => navigate("/")}
          text="Volver al inicio"
        />
      </div>
    </div>
  );
};

export default OrderSuccessPage;