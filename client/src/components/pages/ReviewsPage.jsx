import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getReviews } from "../../services/api";
import "../../styles/Reviews.css";
import Button from "../common/Button";

import imgReview1 from "/src/assets/imgs/review1.avif";
import imgReview2 from "/src/assets/imgs/review2.avif";
import imgReview3 from "/src/assets/imgs/review3.avif";

const reviews = [
  {
    id: 1,
    name: "Mario Castaneda",
    stars: 5,
    quote:
      '"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam"',
    image: imgReview1,
  },
  {
    id: 2,
    name: "Laura Méndez",
    stars: 5,
    quote:
      '"El mejor gimnasio en el que he entrenado, el equipo es increíble y los resultados hablan por sí solos"',
    image: imgReview2,
  },
  {
    id: 3,
    name: "Carlos Rojas",
    stars: 4,
    quote:
      '"Excelente ambiente, profesionales de primer nivel y una atención personalizada que marca la diferencia"',
    image: imgReview3,
  },
];

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReviews = async () => {
      const data = await getReviews();
      if (Array.isArray(data)) setReviews(data);
    };
    fetchReviews();
  }, []);

  useEffect(() => {
    if (reviews.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [reviews]);

  if (reviews.length === 0) {
    return (
      <section className="reviews-section">
        <h4 className="reviews-subtitle">Reseñas</h4>
        <h3 className="reviews-title">Nuestros alumnos hablan</h3>
        <p style={{ textAlign: "center", color: "#ccc" }}>
          Aún no hay reseñas. ¡Sé el primero!
        </p>
        <Button
          className={"cta-button"}
          onClick={() => navigate("/feedback")}
          text="Deja tu comentario"
        />
      </section>
    );
  }

  const review = reviews[current];
  const image = reviewImages[current % reviewImages.length];

  return (
    <section className="reviews-section">
      <h4 className="reviews-subtitle">Reseñas</h4>
      <h3 className="reviews-title">Nuestros alumnos hablan</h3>
      <div className="reviews-card">
        <img src={image} alt={review.name} />
        <div className="reviews-card-overlay">
          <div className="reviews-stars">
            {"★".repeat(review.rating)}
            {"☆".repeat(5 - review.rating)}
          </div>
          <p className="reviews-quote">"{review.comment}"</p>
          <span className="reviews-author">{review.name}</span>
        </div>
      </div>
      <Button
        className={"cta-button"}
        onClick={() => navigate("/feedback")}
        text="Deja tu comentario"
      />
    </section>
  );
};

export default ReviewsPage;