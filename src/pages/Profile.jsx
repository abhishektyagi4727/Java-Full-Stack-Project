import { Lock, Phone, User, Mail, MapPin } from "lucide-react";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getUserProfile, updatePassword } from "../services/apiService";
import ProfileImage from "../assets/images/profileAvtar.jpg";

function Profile() {
  const { user } = useContext(AuthContext);

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordError, setPasswordError] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (user?.email) {
      fetchProfile();
    } else {
      setLoading(false);
      setError("Please login to view profile");
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const response = await getUserProfile(user.email);

      if (response.data?.success) {
        setProfile(response.data.data);
      } else if (response.data) {
        setProfile(response.data);
      } else {
        setProfile(user);
      }
    } catch (err) {
      setError("Failed to load profile");
      setProfile(user);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPasswordError("");

    if (newPassword !== confirmPassword) {
      return setPasswordError("Passwords do not match");
    }

    if (newPassword.length < 6) {
      return setPasswordError("Minimum 6 characters required");
    }

    setUpdating(true);

    try {
      const res = await updatePassword(
        user.email,
        currentPassword,
        newPassword,
      );

      if (res.data?.success) {
        alert("Password Updated Successfully");
        setShowPasswordModal(false);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setPasswordError("Update failed");
      }
    } catch (err) {
      setPasswordError("Incorrect current password");
    } finally {
      setUpdating(false);
    }
  };

  // LOADING
  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-danger"></div>
        <p>Loading...</p>
      </div>
    );
  }

  // ERROR
  if (error && !profile) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  return (
    <>
      <div className="container d-flex justify-content-center mt-5">
        <div
          className="card shadow-lg text-center p-4"
          style={{
            maxWidth: "420px",
            width: "100%",
            borderRadius: "20px",
          }}
        >
          {/* IMAGE */}
          <img
            src={profile?.imageUrl || profile?.avatar || ProfileImage}
            alt="profile"
            className="rounded-circle mx-auto shadow"
            style={{
              width: "130px",
              height: "130px",
              objectFit: "cover",
              border: "4px solid #dc3545",
            }}
          />

          {/* NAME */}
          <h4 className="mt-3 fw-bold">
            {profile?.name || user?.name || "User"}
          </h4>

          <p className="text-muted">{profile?.email || user?.email}</p>

          {/* INFO */}
          <div className="text-start mt-4">
            <div className="d-flex mb-3">
              <User className="text-danger me-3" />
              <div>
                <small>Name</small>
                <div>{profile?.name || "N/A"}</div>
              </div>
            </div>

            <div className="d-flex mb-3">
              <Mail className="text-danger me-3" />
              <div>
                <small>Email</small>
                <div>{profile?.email || "N/A"}</div>
              </div>
            </div>

            <div className="d-flex mb-3">
              <Phone className="text-danger me-3" />
              <div>
                <small>Phone</small>
                <div>{profile?.phone || "N/A"}</div>
              </div>
            </div>

            <div className="d-flex mb-3">
              <MapPin className="text-danger me-3" />
              <div>
                <small>Address</small>
                <div>{profile?.address || "N/A"}</div>
              </div>
            </div>
          </div>

          {/* BUTTON */}
          <button
            className="btn btn-danger mt-3 w-100 rounded-pill"
            onClick={() => setShowPasswordModal(true)}
          >
            <Lock size={16} className="me-2" />
            Change Password
          </button>
        </div>
      </div>

      {/* MODAL */}
      {showPasswordModal && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ background: "rgba(0,0,0,0.6)" }}
        >
          <div
            className="bg-white p-4 rounded shadow"
            style={{ width: "90%", maxWidth: "400px" }}
          >
            <h5 className="mb-3 text-center">Change Password</h5>

            {passwordError && (
              <div className="alert alert-danger">{passwordError}</div>
            )}

            <form onSubmit={handleChangePassword}>
              <input
                type="password"
                className="form-control mb-2"
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />

              <input
                type="password"
                className="form-control mb-2"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />

              <input
                type="password"
                className="form-control mb-3"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <div className="d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowPasswordModal(false)}
                >
                  Cancel
                </button>

                <button className="btn btn-danger" disabled={updating}>
                  {updating ? "Updating..." : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
