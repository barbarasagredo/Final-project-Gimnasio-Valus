import "../../styles/Shop.css";

import imgShop1 from "/src/assets/imgs/tienda1.avif";
import imgShop2 from "/src/assets/imgs/tienda2.avif";
import imgShop3 from "/src/assets/imgs/tienda3.avif";
import imgShop4 from "/src/assets/imgs/tienda4.avif";
import imgShop5 from "/src/assets/imgs/tienda5.avif";
import imgShop6 from "/src/assets/imgs/tienda6.avif";

const products = [
  {
    id: 1,
    name: "Proteína en polvo",
    price: "$2.000",
    image: imgShop5,
  },
  {
    id: 2,
    name: "Agua hidratante",
    price: "$1.800",
    image: imgShop1,
  },
  {
    id: 3,
    name: "Galletas de proteína",
    price: "$1.800",
    image: imgShop2,
  },
  {
    id: 4,
    name: "Creatina Monohydrate",
    price: "$1.800",
    image: imgShop4,
  },
  {
    id: 5,
    name: "Barra proteíca",
    price: "$2.000",
    image: imgShop3,
  },
  {
    id: 6,
    name: "Suplemento vitamínico",
    price: "$1.800",
    image: imgShop6,
  },
];

const ShopPage = () => {
  return (
    <section className="shop-section">
      <h4 className="shop-subtitle">Tienda</h4>
      <p className="shop-description">
        Disponible de manera presencial, consulta disponibilidad.
      </p>
      <div className="shop-grid">
        {products.map((product) => (
          <div key={product.id} className="shop-card">
            <img src={product.image} alt={product.name} />
            <div className="shop-card-overlay">
              <h3 className="shop-card-name">{product.name}</h3>
              <p className="shop-card-price">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShopPage;
