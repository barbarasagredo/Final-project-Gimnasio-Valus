import "../../styles/Footer.css";
import EmailIcon from "../icons/EmailIcon";
import LocationIcon from "../icons/LocationIcon";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-center">
            <a href="/" className="logo">
              <img src="/favicon.svg" alt="Logotipo Valus" />
            </a>
            <h2 className="title">VALUS</h2>
          </div>
          <div className="footer-contact">
            <h4>CONTACTO</h4>
            <div className="contact-item">
              <LocationIcon />
              <p>Av. Arturo Prat 476, Valdivia, Los Ríos</p>
            </div>

            <div className="contact-item">
              <EmailIcon />
              <p>gimnasiovalus@gym.com</p>
            </div>
          </div>

          <div className="footer-social">
            <a
              href="https://wa.me/56912345678?text=Hola%20quiero%20más%20información"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <i className="fa-brands fa-whatsapp"></i>
            </a>

            <a
              href="https://instagram.com/gimnasiovalus"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <i className="fa-brands fa-instagram"></i>
            </a>
          </div>
        </div>

        <div className="footer-bottom-line" />
      </footer>
    </>
  );
};

export default Footer;
