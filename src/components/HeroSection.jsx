import { useNavigate } from "react-router-dom";
function HeroSection() {
  const navigate = useNavigate();
  return (
    <section
      className="hero-section text-center text-white"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=1920')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "100px 0",
        marginBottom: "40px",
        position: "relative",
      }}
    >
      {/* Dark overlay div */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.6)",
          zIndex: 1,
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <h1 className="display-4 fw-bold mb-3">
          🍕 Delicious Food Delivered 🚀
        </h1>
        <p className="lead fs-3">
          Order your favorite meals from the best restaurants in town
        </p>

        <div className="mt-4">
          <button
            className="btn btn-danger btn-lg me-3 px-4"
            onClick={() => navigate("/login")}
            style={{
              borderRadius: "50px",
              fontWeight: "bold",
              boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          >
            Order Now →
          </button>
          <button
            className="btn btn-outline-light btn-lg px-4"
            style={{
              borderRadius: "50px",
              fontWeight: "bold",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          >
            Explore Menu
          </button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
