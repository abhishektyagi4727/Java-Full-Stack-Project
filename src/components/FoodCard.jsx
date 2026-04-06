import { useContext } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Add this import
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

function FoodCard({ food }) {
  const { addToCart } = useContext(CartContext);
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate(); // ✅ Now works with import above

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    addToCart(food);
  };

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <Card className="food-card h-100">
      <div className="img-box">
        <img
          src={food.imageUrl || food.image}
          alt={food.name}
          className="food-img"
          loading="lazy"
        />
      </div>
      <Card.Body>
        <Card.Title>{food.name}</Card.Title>
        <Card.Title className="text-danger">₹{food.price}</Card.Title>
        <Card.Text>{food.description}</Card.Text>

        {isLoggedIn ? (
          <Button variant="success" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        ) : (
          <Button variant="danger" onClick={goToLogin}>
            Login to Order
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default FoodCard;
