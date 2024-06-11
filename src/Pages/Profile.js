import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Style/Profile.css";
import { FaPencilAlt } from "react-icons/fa";

const Profile = () => {
  const [user, setUser] = useState({});
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [editingPassword, setEditingPassword] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/show");
        setUser(response.data[0]);
        const storedProfileImage = localStorage.getItem("profileImage");
        if (storedProfileImage) {
          setUser((prevUser) => ({
            ...prevUser,
            profileImage: storedProfileImage,
          }));
        }
      } catch (error) {
        setError("Error fetching user data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (user.profileImage) {
      localStorage.setItem("profileImage", user.profileImage);
    }
  }, [user.profileImage]);

  const handleEditName = async () => {
    try {
      const response = await axios.put("http://localhost:3001/updateProfile", {
        id: user._id,
        newName: newName,
      });
      setUser({ ...user, name: response.data.user.name });
      setNewName("");
      setEditingName(false);
    } catch (error) {
      console.error("Error updating name:", error);
    }
  };

  const handleEditEmail = async () => {
    try {
      const response = await axios.put("http://localhost:3001/updateProfile", {
        id: user._id,
        newEmail: newEmail,
      });
      setUser({ ...user, email: response.data.user.email });
      setNewEmail("");
      setEditingEmail(false);
    } catch (error) {
      console.error("Error updating email:", error);
    }
  };

  const handleEditPassword = async () => {
    try {
      if (newPassword !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
  
      const response = await axios.put("http://localhost:3001/updatePassword", {
        id: user._id,
        oldPassword: oldPassword,
        newPassword: newPassword,
      });
  
      // Handle success scenario as per your application's logic
      setNewPassword("");
      setOldPassword("");
      setConfirmPassword("");
      setEditingPassword(false);
  
      // Optionally update user state or show success message
    } catch (error) {
      console.error("Error updating password:", error);
      setError("Failed to update password. Please try again.");
    }
  };
  
  
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleImageUpload = async () => {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("profileImage", imageFile);
      const response = await axios.post(
        "http://localhost:3001/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUser({ ...user, profileImage: response.data.filePath });
      setImageFile(null);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <div className="profile-info">
        <div className="profile-image-container">
          {user.profileImage ? (
            <img
              src={`http://localhost:3001/${user.profileImage}`}
              alt="Profile"
              className="profile-image"
            />
          ) : (
            <p>No image uploaded</p>
          )}
          <br />
          <label className="upload-button">
            <input
              type="file"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
            {uploading ? "Uploading..." : "Upload Image"}
          </label>
          <button
            onClick={handleImageUpload}
            disabled={!imageFile || uploading}
            className="upload-button"
          >
            Upload
          </button>
        </div>
        <div className="profile-details">
          <div className="profile-item">
            <div className="item-label">Name:</div>
            {editingName ? (
              <>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="name-input"
                  placeholder="Enter new name"
                />
                <button onClick={handleEditName} className="save-button">
                  Save
                </button>
              </>
            ) : (
              <div className="item-value">
                <span>{user.name}</span>
                <button
                  onClick={() => setEditingName(true)}
                  className="edit-button"
                >
                  <FaPencilAlt /> Edit
                </button>
              </div>
            )}
          </div>
          <div className="profile-item">
            <div className="item-label">Email:</div>
            {editingEmail ? (
              <>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="email-input"
                  placeholder="Enter new email"
                />
                <button onClick={handleEditEmail} className="save-button">
                  Save
                </button>
              </>
            ) : (
              <div className="item-value">
                <span>{user.email}</span>
                <button
                  onClick={() => setEditingEmail(true)}
                  className="edit-button"
                >
                  <FaPencilAlt /> Edit
                </button>
              </div>
            )}
          </div>
          <div className="profile-item">
            <div className="item-label">Password:</div>
            {editingPassword ? (
              <>
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="password-input"
                  placeholder="Enter old password"
                />
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="password-input"
                  placeholder="Enter new password"
                />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="password-input"
                  placeholder="Confirm new password"
                />
                <button onClick={handleEditPassword} className="save-button">
                  Save
                </button>
              </>
            ) : (
              <div className="item-value">
                <span>*******</span>
                <button
                  onClick={() => setEditingPassword(true)}
                  className="edit-button"
                >
                  <FaPencilAlt /> Edit
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
