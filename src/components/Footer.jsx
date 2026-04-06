import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer
      className="text-white mt-5"
      style={{
        background: "linear-gradient(135deg, #1f1f1f, #343a40)",
      }}
    >
      <div className="container py-5">
        <div className="row text-center text-md-start">
          {/* About */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold mb-3 text-danger">🍔 Food Delivery</h5>
            <p style={{ fontSize: "14px", color: "#ccc" }}>
              We deliver the best food in town right to your doorstep. Enjoy
              delicious meals with fast delivery and top quality service.
            </p>
          </div>

          {/* Links */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold mb-3">Quick Links</h5>

            <div className="d-flex flex-column gap-2">
              <Link to="/terms" className="text-decoration-none text-light">
                Terms & Conditions
              </Link>

              <Link to="/privacy" className="text-decoration-none text-light">
                Privacy Policy
              </Link>

              <Link to="/contact" className="text-decoration-none text-light">
                Contact Us
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold mb-3">Contact</h5>

            <p style={{ fontSize: "14px", color: "#ccc" }}>
              📞 9625958050 <br />
              📧 food.rd@gmail.com <br />
              📍 Noida Sector 16, FM Road
            </p>
          </div>
        </div>

        {/* Divider */}
        <hr style={{ borderColor: "#555" }} />

        {/* Bottom */}
        <div
          className="text-center"
          style={{ fontSize: "13px", color: "#aaa" }}
        >
          © {new Date().getFullYear()} Food Delivery App. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
