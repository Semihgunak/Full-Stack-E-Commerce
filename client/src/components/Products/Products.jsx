import "./Products.css";
import ProductItem from "./ProductItem";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

function NextBtn({ onClick }) {
  return (
    <button
      className="glide__arrow glide__arrow--right"
      data-glide-dir=">"
      onClick={onClick}
    >
      <i className="bi bi-chevron-right"></i>
    </button>
  );
}

function PrevBtn({ onClick }) {
  return (
    <button
      className="glide__arrow glide__arrow--left"
      data-glide-dir="<"
      onClick={onClick}
    >
      <i className="bi bi-chevron-left"></i>
    </button>
  );
}

const Products = () => {
  const [products,setProducts] = useState([]);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/products`);

        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          message.error("Login Failed!");
        }
      } catch (error) {
        console.log(error);
      } 
    };

    fetchProducts();
  }, [apiUrl]);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <NextBtn />,
    prevArrow: <PrevBtn />,
    autoplaySpeed: 3000,
    autoplay:true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="products">
      <div className="container">
        <div className="section-title">
          <h2>Featured Products</h2>
          <p>Summer Collection New Morden Design</p>
        </div>
        <div className="product-wrapper product-carousel">
          <div className="glide__track" data-glide-el="track">
            <Slider {...settings}>
              {products.map((product) => (
                <ProductItem key={product._id} product={product} />
              ))}
            </Slider>
          </div>
          <div className="glide__arrows" data-glide-el="controls"></div>
        </div>
      </div>
    </section>
  );
};

export default Products;
