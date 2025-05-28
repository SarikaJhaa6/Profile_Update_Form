import React, { useContext, useState } from "react";
import { UserFormContext } from "../contexts/UserFormContext";
import { validateAddressLine1 } from "../utils/validators";
import { validateCompanyName } from "../utils/validators";
import { useNavigate } from "react-router-dom";

import "./Step2Professional.css";
const Step2Professional = () => {
  const { formData, updateFormData, nextStep, prevStep } =
    useContext(UserFormContext);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleNext = () => {
    const newErrors = {};

    const compError = validateCompanyName(
      formData.profession,
      formData.companyName
    );
    if (compError) newErrors.companyName = compError;

    const addressError = validateAddressLine1(formData.addressLine1);
    if (addressError) newErrors.addressLine1 = addressError;

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      nextStep();
      navigate("/preferences");
    }
  };
  

  return (
    <div className="professional-form-container">
      <form className="professional-form-card">
        <h2>Step 2: Professional Details</h2>

        <label htmlFor="profession">
          Profession: <span className="required">*</span>
        </label>
        <select
          id="profession"
          value={formData.profession}
          onChange={(e) => updateFormData({ profession: e.target.value })}
        >
          <option value="Student">Student</option>
          <option value="Developer">Developer</option>
          <option value="Entrepreneur">Entrepreneur</option>
        </select>

        {formData.profession === "Entrepreneur" && (
          <>
            <label htmlFor="companyName">
              Company Name: <span className="required">*</span>
            </label>
            <input
              id="companyName"
              type="text"
              value={formData.companyName}
              onChange={(e) => {
                const value = e.target.value;
                updateFormData({ companyName: value });

                const compError = validateCompanyName(
                  formData.profession,
                  value
                );
                setErrors((prev) => ({
                  ...prev,
                  companyName: compError || undefined,
                }));
              }}
            />

            {errors.companyName && (
              <p className="error-text">{errors.companyName}</p>
            )}
          </>
        )}

        <label htmlFor="addressLine1">
          Address Line 1: <span className="required">*</span>
        </label>
        <input
          id="addressLine1"
          type="text"
          value={formData.addressLine1}
          onChange={(e) => {
            const value = e.target.value;
            updateFormData({ addressLine1: value });

            const addressError = validateAddressLine1(value);
            setErrors((prev) => ({
              ...prev,
              addressLine1: addressError || undefined,
            }));
          }}
        />

        {errors.addressLine1 && (
          <p className="error-text">{errors.addressLine1}</p>
        )}

        <div className="form-actions">
          <button type="button" onClick={prevStep}>
            Back
          </button>
          <button type="button" onClick={handleNext}>
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step2Professional;
