import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "../../styles/Navbar.css";
import UserIcon from "../icons/UserIcon";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

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
          <Link to="/admin" onClick={handleLinkClick} style={{ color: "#e48532", fontWeight: "bold" }}>
            Administrador
          </Link>
        )}
      </div>

      <div className="navbar-right">
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
        {user && <a onClick={() => scrollToSection("store")}>Tienda</a>}
        {user?.role === "admin" && (
          <Link to="/admin" onClick={handleLinkClick} style={{ color: "#e53e3e", fontWeight: "bold" }}>
            Admin
          </Link>
        )}
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