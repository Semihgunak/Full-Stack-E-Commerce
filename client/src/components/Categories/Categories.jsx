import React, { useCallback, useEffect, useState } from "react";
import CategoryItem from "./CategoryItem";
import "./Categories.css";

const Categories = ({products,filtered,setFiltered}) => {
  
  const [dataSource, setDataSource] = useState([]);

  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/categories`);

        if (response.ok) {
          const data = await response.json();
          setDataSource(data);
        } else {
          message.error("Login Failed!");
        }
      } catch (error) {
        console.log(error);
      } 
    };

    fetchCategories();
  }, [apiUrl]);


  return (
    <section className="categories">
      <div className="container">
        <div className="section-title">
          <h2>All Categories</h2>
          <p>Summer Collection New Morden Design</p>
        </div>
        <ul className="category-list">
        {dataSource.map((data)=>(
          <CategoryItem products={products} filtered={filtered} setFiltered={setFiltered} data={data} key={data._id} />
        ))}
          
        </ul>
      </div>
    </section>
  );
};

export default Categories;
