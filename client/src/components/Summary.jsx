import React, { useContext, useState } from "react";
import { UserFormContext } from "../contexts/UserFormContext";
import { submitUserProfile } from "../api/api";
import { useNavigate } from "react-router-dom";
import { FaRegSmileBeam } from "react-icons/fa";
import Swal from "sweetalert2";
import "./Summary.css";

const Summary = () => {
  const { formData, prevStep, clearFormData } = useContext(UserFormContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await submitUserProfile(formData);

      await Swal.fire({
        icon: "success",
        title: "Profile updated successfully!",
        confirmButtonText: "OK",
      });

      clearFormData();
      navigate("/personal");
    } catch (err) {
      await Swal.fire({
        icon: "error",
        title: "Submission failed",
        text: "Please try again.",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="summary-container">
      <div className="summary-card">
        <h2 className="summary-title">
          <FaRegSmileBeam style={{ marginRight: "8px" }} />
          Profile Summary
        </h2>

        <div className="summary-content">
          <div className="summary-photo-section">
            {formData.profilePhoto ? (
              <img
                src={URL.createObjectURL(formData.profilePhoto)}
                alt="Profile"
                className="summary-photo"
              />
            ) : (
              <div className="summary-photo placeholder">No Photo</div>
            )}
          </div>

          <div className="summary-details">
            <p>
              <strong>Username:</strong> {formData.username}
            </p>
            <p>
              <strong>Profession:</strong> {formData.profession}
            </p>
            {formData.profession === "Entrepreneur" && (
              <p>
                <strong>Company Name:</strong> {formData.companyName}
              </p>
            )}
            <p>
              <strong>Address:</strong> {formData.addressLine1}, {formData.city}
              , {formData.state}, {formData.country}
            </p>
            <p>
              <strong>Subscription Plan:</strong> {formData.subscriptionPlan}
            </p>
            <p>
              <strong>Newsletter:</strong> {formData.newsletter ? "Yes" : "No"}
            </p>
          </div>
        </div>

        <div className="summary-actions">
          <button onClick={prevStep} className="back-button" disabled={loading}>
            Back
          </button>
          <button
            onClick={handleSubmit}
            className="submit-button"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Summary;
