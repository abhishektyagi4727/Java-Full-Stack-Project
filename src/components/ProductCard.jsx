// const BASE_URL='http://127.0.0.1:8000/api/foods/'
import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import FoodCard from "./FoodCard";
import CategoryFilter from "./CategoryFilter";

function ProductCard() {
  const [foods, setFoods] = useState([]);
  const [filter, setFilter] = useState(null); // Changed: use ID instead of name
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Spring Boot API endpoint
    axios
      .get("http://localhost:8080/api/products")
      .then((res) => {
        // Handle Spring Boot response format
        if (res.data && res.data.success) {
          setFoods(res.data.data || []);
        } else if (res.data) {
          setFoods(res.data || []);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError("Failed to load products");
        setLoading(false);
      });
  }, []);

  // Filter products based on selected category ID
  const filteredItems = useMemo(() => {
    if (filter === null) return foods;
    return foods.filter((item) => item.categoryId === filter);
  }, [foods, filter]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading delicious food...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center m-5">
        {error}. Please make sure backend is running on port 8080.
      </div>
    );
  }

  return (
    <>
      <CategoryFilter setFilter={setFilter} selectedCategory={filter} />
      <div className="container">
        <div className="row">
          {filteredItems.map((food) => (
            <div key={food.id} className="col-12 col-sm-6 col-md-4 mb-4">
              <FoodCard food={food} />
            </div>
          ))}
        </div>
        {filteredItems.length === 0 && (
          <div className="alert alert-info text-center">
            No products found in this category
          </div>
        )}
      </div>
    </>
  );
}

export default ProductCard;
