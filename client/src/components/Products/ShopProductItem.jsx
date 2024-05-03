import { useContext } from "react";
import "./ProductItem.css";
import { CartContext } from "../../context/CartProvider";
import { Link } from "react-router-dom";
const ShopProductItem = ({ product }) => {
  const { addToCart, cartItems } = useContext(CartContext);

  const filtered = cartItems.find((cartItem) => cartItem._id === product._id);
  const discountPercent = product.price.discount;
  const orginalPrice = product.price.current;
  const discountedPrice = orginalPrice - (orginalPrice * discountPercent) / 100;
  return (
    <div className="product-item glide__slide glide__slide--active">
      <div className="product-image">
        <Link to={`product/${product._id}`}>
          <img src={product.img[0]} height={300} alt="" className="img1" />
          <img src={product.img[1]} height={300} alt="" className="img2" />
        </Link>
      </div>
      <div className="product-info">
        <a href="$" className="product-title">
          {product.name.toUpperCase()}
        </a>
        <ul className="product-star">
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
          <li>
            <i className="bi bi-star-half"></i>
          </li>
        </ul>
        <div className="product-prices">
          <strong className="new-price">{discountedPrice.toFixed(2)}</strong>
          <span className="old-price">{orginalPrice.toFixed(2)}</span>
        </div>
        <span className="product-discount">-%{product.price.discount}</span>
        <div className="product-links">
          <button
            className="add-to-cart"
            onClick={() => addToCart({ ...product, price: discountedPrice })}
            disabled={filtered}
          >
            <i className="bi bi-basket-fill"></i>
          </button>
          <button>
            <i className="bi bi-heart-fill"></i>
          </button>
          <Link to={`product/${product._id}`} className="product-link">
            <i className="bi bi-eye-fill"></i>
          </Link>
          <a href="#">
            <i className="bi bi-share-fill"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ShopProductItem;
