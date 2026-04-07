// src/components/Navbar.jsx
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {
  FaHome,
  FaShoppingCart,
  FaClipboardList,
  FaUser,
  FaSignOutAlt,
  FaSignInAlt,
  FaUserPlus,
  FaUtensils,
} from "react-icons/fa";

function NavbarComponent() {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Navbar expand="lg" className="custom-navbar" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand-logo">
          <FaUtensils className="brand-icon" />
          <span>Apna Kitchen</span>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="custom-toggler"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {!isLoggedIn && (
              <>
                <Nav.Link as={Link} to="/" className="nav-link-custom">
                  <FaHome className="nav-icon" />
                  <span>Home</span>
                </Nav.Link>
                <Nav.Link as={Link} to="/login" className="nav-link-custom">
                  <FaSignInAlt className="nav-icon" />
                  <span>Login</span>
                </Nav.Link>
                <Nav.Link as={Link} to="/register" className="nav-link-custom">
                  <FaUserPlus className="nav-icon" />
                  <span>Register</span>
                </Nav.Link>
              </>
            )}
            {isLoggedIn && (
              <>
                <Nav.Link as={Link} to="/" className="nav-link-custom">
                  <FaHome className="nav-icon" />
                  <span>Home</span>
                </Nav.Link>
                <Nav.Link as={Link} to="/cart" className="nav-link-custom">
                  <FaShoppingCart className="nav-icon" />
                  <span>Cart</span>
                </Nav.Link>
                <Nav.Link as={Link} to="/orders" className="nav-link-custom">
                  <FaClipboardList className="nav-icon" />
                  <span>My Orders</span>
                </Nav.Link>
                <Nav.Link as={Link} to="/profile" className="nav-link-custom">
                  <FaUser className="nav-icon" />
                  <span>Profile</span>
                </Nav.Link>
                <Nav.Link
                  onClick={handleLogout}
                  className="nav-link-custom logout-btn"
                >
                  <FaSignOutAlt className="nav-icon" />
                  <span>Logout</span>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>

      <style jsx>{`
        .custom-navbar {
          background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
          padding: 0.8rem 0;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .brand-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 1.5rem;
          font-weight: bold;
          color: white !important;
          text-decoration: none;
          transition: transform 0.3s ease;
        }

        .brand-logo:hover {
          transform: scale(1.05);
          color: #ffeb3b !important;
        }

        .brand-icon {
          font-size: 1.8rem;
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-3px);
          }
        }

        .custom-toggler {
          border-color: rgba(255, 255, 255, 0.5);
          background-color: transparent;
        }

        .custom-toggler:focus {
          box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.3);
        }

        .nav-link-custom {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0.5rem 1.2rem !important;
          margin: 0 0.2rem;
          color: white !important;
          font-weight: 500;
          border-radius: 25px;
          transition: all 0.3s ease;
          position: relative;
        }

        .nav-link-custom:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
          color: #ffeb3b !important;
        }

        .nav-icon {
          font-size: 1.1rem;
          transition: transform 0.3s ease;
        }

        .nav-link-custom:hover .nav-icon {
          transform: scale(1.1);
        }

        .logout-btn:hover {
          background: rgba(255, 82, 82, 0.3);
          color: #ff6b6b !important;
        }

        /* Active link styling */
        .nav-link-custom.active {
          background: rgba(255, 255, 255, 0.25);
          color: #ffeb3b !important;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .custom-navbar {
            padding: 0.5rem 0;
          }

          .nav-link-custom {
            padding: 0.6rem 1rem !important;
            margin: 0.2rem 0;
            justify-content: center;
          }

          .brand-logo {
            font-size: 1.2rem;
          }

          .brand-icon {
            font-size: 1.4rem;
          }
        }

        /* Animation for navbar on scroll */
        .custom-navbar.sticky-top {
          backdrop-filter: blur(10px);
        }
      `}</style>
    </Navbar>
  );
}

export default NavbarComponent;
