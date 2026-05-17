import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import "../../styles/Navbar.css";
import UserIcon from "../icons/UserIcon";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const { cart } = useCart();
  const navigate = useNavigate();

  const cartCount = cart.reduce((sum, p) => sum + p.quantity, 0);

  const handleLinkClick = () => {
    setOpen(false);
  };

  const scrollToSection = (id) => {
    setOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">
          <img src="/favicon.svg" alt="Logotipo Valus" />
        </Link>
        <h2 className="title">VALUS</h2>
      </div>

      <div className="menu-desktop">
        <a onClick={() => scrollToSection("about")}>Conócenos</a>
        <a onClick={() => scrollToSection("reviews")}>Reseñas</a>
        <a onClick={() => scrollToSection("plans")}>Planes</a>
        <a onClick={() => scrollToSection("team")}>Equipo</a>
        {user && <a onClick={() => scrollToSection("store")}>Tienda</a>}
        {user && (
          <Link to="/profile" onClick={handleLinkClick}>
            Perfil
          </Link>
        )}
        {user?.role === "admin" && (
          <Link
            to="/admin"
            onClick={handleLinkClick}
            style={{ color: "#e48532", fontWeight: "bold" }}
          >
            Administrador
          </Link>
        )}
      </div>

      <div className="navbar-right">
        {/* ✅ Ícono carrito solo si está logueado y tiene productos */}
        {user && (
          <div
            onClick={() => navigate("/checkout")}
            style={{
              position: "relative",
              cursor: "pointer",
              marginRight: "8px",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 6h13M7 13L5.4 5M10 21a1 1 0 100-2 1 1 0 000 2zm7 0a1 1 0 100-2 1 1 0 000 2z"
              />
            </svg>
            {cartCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-6px",
                  right: "-6px",
                  background: "#e07b20",
                  color: "#fff",
                  borderRadius: "50%",
                  width: "18px",
                  height: "18px",
                  fontSize: "0.7rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                }}
              >
                {cartCount}
              </span>
            )}
          </div>
        )}
        <div
          className="user-icon"
          onClick={() => navigate(user ? "/profile" : "/login")}
        >
          <UserIcon />
        </div>
        <div className="hamburger" onClick={() => setOpen(!open)}>
          <span className={open ? "bar active" : "bar"}></span>
          <span className={open ? "bar active" : "bar"}></span>
          <span className={open ? "bar active" : "bar"}></span>
        </div>
      </div>

      <div className={`menu-mobile ${open ? "show" : ""}`}>
        <button onClick={() => scrollToSection("about")}>Conócenos</button>
        <button onClick={() => scrollToSection("reviews")}>Reseñas</button>
        <button onClick={() => scrollToSection("plans")}>Planes</button>
        <button onClick={() => scrollToSection("team")}>Equipo</button>
        <button>
          {user && <a onClick={() => scrollToSection("store")}>Tienda</a>}
        </button>
          {user && cartCount > 0 && (
            <Link
              to="/checkout"
              onClick={handleLinkClick}
              style={{ color: "#e07b20" }}
            >
              🛒 Carrito ({cartCount})
            </Link>
          )}
        <button>
        {user?.role === "admin" && (
          <Link
            to="/admin"
            onClick={handleLinkClick}
            style={{ color: "#e07b20", fontWeight: "bold" }}
          >
            Administrador
          </Link>
        )}
        </button>
        {user ? (
          <button onClick={logout}>Cerrar sesión</button>
        ) : (
          <Link to="/login" onClick={handleLinkClick}>
            Iniciar sesión
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
