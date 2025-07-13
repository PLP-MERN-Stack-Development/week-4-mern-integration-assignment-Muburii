import { useEffect, useState } from "react";
import { categoryService } from "../services/api";

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    categoryService.getAllCategories()
      .then((data) => {
        // Adjust depending on your API response
        setCategories(data.categories || data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API error:", err.response ? err.response.data : err.message);
        setError("Failed to load categories");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Categories</h2>
      {categories.length === 0 && <p>No categories found</p>}
      <ul>
        {categories.map((cat) => (
          <li key={cat._id}>{cat.name}</li>
        ))}
      </ul>
    </div>
  );
}