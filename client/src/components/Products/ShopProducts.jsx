import "./ShopProducts.css";
import React, { useEffect, useState } from "react";

import ShopProductItem from "./ShopProductItem";
import Categories from "../Categories/Categories";

const ShopProducts = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/products`);

        if (response.ok) {
          const data = await response.json();
          setProducts(data);
          setFiltered(data)
        } else {
          message.error("Login Failed!");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, [apiUrl]);




  return (
    <>
      <Categories products={products} filtered={filtered} setFiltered={setFiltered} />
      <section className="products">
        <div className="container">
          <div className="section-title">
            <h2>Featured Products</h2>
            <p>Summer Collection New Morden Design</p>
          </div>
          <div className="product-wrapper product-carousel">
            <div className="glide__track" data-glide-el="track">
              <ul className="product-list glide__slides" id="product-list">
                {filtered.map((product) => (
                  <ShopProductItem key={product._id} product={product} />
                ))}
              </ul>
            </div>
            <div className="glide__arrows" data-glide-el="controls"></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopProducts;
