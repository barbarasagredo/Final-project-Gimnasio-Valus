import "../../styles/AboutUs.css";

import imgAboutus1 from "/src/assets/imgs/aboutus1.avif";
import imgAboutus2 from "/src/assets/imgs/aboutus2.avif";
import imgAboutus3 from "/src/assets/imgs/aboutus3.avif";

const features = [
  {
    id: 1,
    title: "Zona de Fuerza y Cardio",
    text: "Equipamiento moderno y una amplia variedad de máquinas de pesas, mancuernas y caminadoras para potenciar tu resistencia y construir masa muscular a tu propio ritmo.",
    image: imgAboutus1,
  },
  {
    id: 2,
    title: "Entrenamiento Funcional",
    text: "Sesiones dinámicas de alta intensidad diseñadas para mejorar tu agilidad, fuerza core y quemar calorías en un ambiente grupal y motivador.",
    image: imgAboutus2,
  },
  {
    id: 3,
    title: "Coach Personalizado",
    text: "Entrenadores certificados que diseñarán rutinas a tu medida y te guiarán paso a paso en cada ejercicio para asegurar tus resultados de forma segura.",
    image: imgAboutus3,
  },
];

const AboutUsPage = () => {
  return (
    <section className="about-section">
      <h4 className="about-subtitle">Conócenos</h4>
      <h3 className="about-title">¿Por qué entrenar con nosotros?</h3>
      <p className="about-description">
        Somos un espacio diseñado para personas de todos los niveles, desde
        principiantes hasta atletas de alto rendimiento.
        <br />
        Nuestra misión es motivarte a adoptar un estilo de vida saludable a
        través de un entrenamiento inteligente, instalaciones modernas y un
        ambiente lleno de energía.
      </p>
      <div className="about-grid">
        {features.map((feature) => (
          <div key={feature.id} className="about-card">
            <img src={feature.image} alt={feature.title} />
            <div className="about-card-overlay">
              <h3 className="about-card-title">{feature.title}</h3>
              <p className="about-card-text">{feature.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutUsPage;