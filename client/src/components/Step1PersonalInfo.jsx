import React, { useContext, useState, useEffect } from "react";
import { UserFormContext } from "../contexts/UserFormContext";
import { useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "./PasswordStrengthMeter";
import "./Step1PersonalInfo.css";
import {
  BiUser,
  BiLock,
//   BiImage,
  BiRename,
  BiUpload,
  BiMaleFemale,
} from "react-icons/bi";

import {
  validateUsername,
  validateNewPassword,
  validateCurrentPassword,
  validateProfilePhoto,
  validateFullName,
  validateGender,
} from "../utils/validators";
import { checkUsernameAvailability } from "../api/api";

const Step1PersonalInfo = () => {
  const { formData, updateFormData, nextStep } = useContext(UserFormContext);
  const [errors, setErrors] = useState({});
  const [usernameAvailable, setUsernameAvailable] = useState(null);
  const [checkingUsername, setCheckingUsername] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!formData.username || validateUsername(formData.username)) {
      setUsernameAvailable(null);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setCheckingUsername(true);
      const available = await checkUsernameAvailability(formData.username);
      setUsernameAvailable(available);
      setCheckingUsername(false);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [formData.username]);

  const handleNext = () => {
    const newErrors = {};

    const photoError = validateProfilePhoto(formData.profilePhoto);
    if (photoError) newErrors.profilePhoto = photoError;

    const fullNameError = validateFullName(formData.fullName);
    if (fullNameError) newErrors.fullName = fullNameError;

    const genderError = validateGender(formData.gender, formData.customGender);
    if (genderError) newErrors.gender = genderError;

    const usernameError = validateUsername(formData.username);
    if (usernameError) newErrors.username = usernameError;
    else if (usernameAvailable === false)
      newErrors.username = "Username is already taken";

    if (formData.updatePassword) {
        const currentPassError = validateCurrentPassword(
          formData.currentPassword,
          formData.newPassword
        );
        if (currentPassError) newErrors.currentPassword = currentPassError;
          
      if (currentPassError) newErrors.currentPassword = currentPassError;

      const newPassError = validateNewPassword(formData.newPassword);
      if (newPassError) newErrors.newPassword = newPassError;

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your new password";
      } else if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }
      

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      nextStep();
      navigate("/professional"); // Go to next route
    }  };

  return (
    <div className="personal-form-container">
      <form className="personal-form-card">
        <h2 className="form-title">Step 1: Personal Info</h2>
        {/* Full Name & Gender in one row */}
        <div className="form-row">
          <div className="form-group half-width">
            <label htmlFor="fullName">
              Full Name <span style={{ color: "red" }}>*</span>
            </label>
            <div className="input-icon-wrapper">
              <BiRename className="input-icon" />
              <input
                id="fullName"
                className="styled-input"
                placeholder="Enter your full name"
                value={formData.fullName || ""}
                onChange={(e) => {
                  updateFormData({ fullName: e.target.value });
                  setErrors((prev) => ({ ...prev, fullName: undefined }));
                }}
              />
            </div>
            {errors.fullName && (
              <div className="error-text">{errors.fullName}</div>
            )}
          </div>

          <div className="form-group half-width">
            <label htmlFor="gender">
              Gender <span style={{ color: "red" }}>*</span>
            </label>
            <div className="input-icon-wrapper">
              <BiMaleFemale className="input-icon" />
              <select
                id="gender"
                className="styled-input"
                value={formData.gender || ""}
                onChange={(e) => {
                  updateFormData({ gender: e.target.value, customGender: "" });
                  setErrors((prev) => ({ ...prev, gender: undefined }));
                }}
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            {errors.gender && <div className="error-text">{errors.gender}</div>}
          </div>
        </div>

        {formData.gender === "Other" && (
          <div className="form-group">
            <label htmlFor="customGender">Specify Gender</label>
            <div className="input-icon-wrapper">
              <BiRename className="input-icon" />
              <input
                id="customGender"
                className="styled-input"
                placeholder="Enter custom gender"
                value={formData.customGender || ""}
                onChange={(e) => {
                  updateFormData({ customGender: e.target.value });
                  setErrors((prev) => ({ ...prev, gender: undefined }));
                }}
              />
            </div>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="username">
            Username <span style={{ color: "red" }}>*</span>
          </label>
          <div className="input-icon-wrapper">
            <BiUser className="input-icon" />

            <input
              id="username"
              className="styled-input"
              placeholder="Choose a username"
              value={formData.username || ""}
              onChange={(e) => {
                updateFormData({ username: e.target.value });
                setErrors((prev) => ({ ...prev, username: undefined }));
              }}
            />
          </div>
          {checkingUsername && (
            <div className="info-text">Checking availability...</div>
          )}
          {usernameAvailable && (
            <div className="success-text">Username is available</div>
          )}
          {usernameAvailable === false && (
            <div className="error-text">Username is already taken</div>
          )}
          {errors.username && (
            <div className="error-text">{errors.username}</div>
          )}
        </div>

        <div className="form-group">
          <input
            type="checkbox"
            id="updatePassword"
            checked={formData.updatePassword || false}
            onChange={(e) => {
              const checked = e.target.checked;
              updateFormData({
                updatePassword: checked,
                ...(checked
                  ? {}
                  : {
                      currentPassword: "",
                      newPassword: "",
                      confirmPassword: "",
                    }),
              });
              if (!checked) {
                setErrors((prev) => ({
                  ...prev,
                  currentPassword: undefined,
                  newPassword: undefined,
                  confirmPassword: undefined,
                }));
              }
            }}
          />

          <label htmlFor="updatePassword" className="checkbox-label">
            Do you want to update your password?
          </label>
        </div>

        {/* New Password & Confirm Password in one row */}
        {formData.updatePassword && (
          <>
            {/* Current Password Field */}
            <div className="form-group">
              <label htmlFor="currentPassword">Current Password</label>
              <div className="input-icon-wrapper">
                <BiLock className="input-icon" />
                <input
                  id="currentPassword"
                  className="styled-input"
                  type="password"
                  placeholder="Enter current password"
                  value={formData.currentPassword || ""}
                  onChange={(e) => {
                    updateFormData({ currentPassword: e.target.value });
                    setErrors((prev) => ({
                      ...prev,
                      currentPassword: undefined,
                    }));
                  }}
                />
              </div>
              {errors.currentPassword && (
                <div className="error-text">{errors.currentPassword}</div>
              )}
            </div>

            {/* Show these only if current password is entered */}
            {formData.currentPassword && (
              <>
                <div className="form-row">
                  <div className="form-group half-width">
                    <label htmlFor="newPassword">New Password</label>
                    <div className="input-icon-wrapper">
                      <BiLock className="input-icon" />
                      <input
                        id="newPassword"
                        className="styled-input"
                        type="password"
                        placeholder="Enter new password"
                        value={formData.newPassword || ""}
                        onChange={(e) => {
                          updateFormData({ newPassword: e.target.value });
                          setErrors((prev) => ({
                            ...prev,
                            newPassword: undefined,
                          }));
                        }}
                      />
                    </div>
                    {errors.newPassword && (
                      <div className="error-text">{errors.newPassword}</div>
                    )}
                  </div>

                  <div className="form-group half-width">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <div className="input-icon-wrapper">
                      <BiLock className="input-icon" />
                      <input
                        id="confirmPassword"
                        className="styled-input"
                        type="password"
                        placeholder="Confirm password"
                        value={formData.confirmPassword || ""}
                        onChange={(e) => {
                          updateFormData({ confirmPassword: e.target.value });
                          setErrors((prev) => ({
                            ...prev,
                            confirmPassword: undefined,
                          }));
                        }}
                      />
                    </div>
                    {errors.confirmPassword && (
                      <div className="error-text">{errors.confirmPassword}</div>
                    )}
                  </div>
                </div>

                <PasswordStrengthMeter password={formData.newPassword} />
              </>
            )}
          </>
        )}

        {/* File upload styled like screenshot */}
        <div className="form-group file-upload-group">
          <label htmlFor="profilePhoto">
            Profile Photo <span style={{ color: "red" }}>*</span>
          </label>
          <div className="upload-section">
            <small
              style={{
                color: "#666",
                fontSize: "0.85rem",
                marginTop: "4px",
                display: "block",
              }}
            >
              Supported formats: JPG, PNG. Max file size: 2MB.
            </small>
          </div>

          <div className="upload-section">
            <div className="input-icon-wrapper">
              <BiUpload className="input-icon" />
              <input
                id="profilePhoto"
                type="file"
                accept=".png, .jpg, .jpeg"
                className="styled-input"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file) return;

                  const validTypes = ["image/png", "image/jpeg"];
                  const maxSize = 2 * 1024 * 1024; // 2MB in bytes

                  if (!validTypes.includes(file.type)) {
                    setErrors((prev) => ({
                      ...prev,
                      profilePhoto: "Only PNG and JPG files are allowed",
                    }));
                    updateFormData({ profilePhoto: null });
                    return;
                  }

                  if (file.size > maxSize) {
                    setErrors((prev) => ({
                      ...prev,
                      profilePhoto: "File size must be less than 2MB",
                    }));
                    updateFormData({ profilePhoto: null });
                    return;
                  }

                  // If all checks pass:
                  updateFormData({ profilePhoto: file });
                  setErrors((prev) => ({ ...prev, profilePhoto: undefined }));
                }}
              />
            </div>

            {formData.profilePhoto && (
              <img
                src={URL.createObjectURL(formData.profilePhoto)}
                alt="preview"
                className="preview-img"
              />
            )}

            {errors.profilePhoto && (
              <div className="error-text">{errors.profilePhoto}</div>
            )}
          </div>
        </div>

        <div className="text-end">
          <button
            className="btn btn-primary"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              handleNext();
            }}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step1PersonalInfo;
