import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { getCategories } from "../services/apiService";

function CategoryFilter({ setFilter, selectedCategory }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch categories from Spring Boot API
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await getCategories();
      console.log("Categories response:", response);

      // Handle Spring Boot response format
      if (response.data && response.data.success) {
        setCategories(response.data.data || []);
      } else if (response.data) {
        setCategories(response.data || []);
      }
    } catch (error) {
      console.error("Error loading categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (categoryName, categoryId) => {
    // Pass both name and ID to parent
    setFilter(categoryName === "all" ? null : categoryId);
  };

  if (loading) {
    return (
      <div className="CategorCss center d-flex justify-content-center mb-5">
        <Button variant="secondary" disabled>
          Loading categories...
        </Button>
      </div>
    );
  }

  return (
    <div className="CategorCss center d-flex justify-content-center mb-5 flex-wrap gap-2">
      {/* All Categories Button */}
      <Link to="#" style={{ textDecoration: "none" }}>
        <Button
          variant={selectedCategory === "all" ? "danger" : "outline-danger"}
          onClick={() => handleCategoryClick("all", null)}
        >
          All Categories
        </Button>
      </Link>

      {/* Dynamic Categories from API */}
      {categories.map((category) => (
        <Link key={category.id} to="#" style={{ textDecoration: "none" }}>
          <Button
            variant={
              selectedCategory === category.id ? "danger" : "outline-danger"
            }
            onClick={() => handleCategoryClick(category.name, category.id)}
          >
            {category.name}
          </Button>
        </Link>
      ))}
    </div>
  );
}

export default CategoryFilter;
