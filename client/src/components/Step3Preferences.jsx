import React, { useContext, useEffect, useState } from "react";
import { UserFormContext } from "../contexts/UserFormContext";
import { fetchCountries, fetchStates, fetchCities } from "../api/api";
import "./Step3Preferences.css";
import { useNavigate } from "react-router-dom";
import {
  validateSubscriptionPlan,
  validateDOB,
  validateCountry,
  validateState,
  validateCity,
} from "../utils/validators"; 
const Step3Preferences = () => {
  const { formData, updateFormData, nextStep, prevStep, handleCountryChange } =
    useContext(UserFormContext);

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchCountries().then((data) => setCountries(data));
  }, []);
  // Fix for fetching states when country changes
  useEffect(() => {
    if (formData.country) {
      fetchStates(formData.country).then((statesData) => {
        setStates(statesData);
        if (!statesData.includes(formData.state)) {
          updateFormData({ state: "", city: "" });
        }
      });
    } else {
      setStates([]);
      updateFormData({ state: "", city: "" });
    }
    setCities([]);
  }, [formData.country, formData.state, updateFormData]); // ✅ includes all required dependencies

  // Fix for fetching cities when state changes
  useEffect(() => {
    if (formData.state) {
      fetchCities(formData.state).then((citiesData) => {
        setCities(citiesData);
        if (!citiesData.includes(formData.city)) {
          updateFormData({ city: "" });
        }
      });
    } else {
      setCities([]);
      updateFormData({ city: "" });
    }
  }, [formData.state, formData.city, updateFormData]); // ✅ includes all required dependencies

  const todayDate = new Date().toISOString().split("T")[0];

  const handleNext = () => {
    const newErrors = {
      dob: validateDOB(formData.dob),
      country: validateCountry(formData.country),
      state: validateState(formData.state),
      city: validateCity(formData.city),
      subscriptionPlan: validateSubscriptionPlan(formData.subscriptionPlan),
    };

    // Filter out empty errors
    Object.keys(newErrors).forEach((key) => {
      if (!newErrors[key]) delete newErrors[key];
    });

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      nextStep();
      navigate("/summary");
    }
  };
  

  return (
    <div className="preferences-form-container">
      <div className="preferences-form-card">
        <h2>Step 3: Preferences</h2>

        <div className="form-row">
          <div className="form-group-step3">
            <label>
              Date of Birth: <span className="required">*</span>
            </label>
            <input
              type="date"
              max={todayDate}
              value={formData.dob}
              onChange={(e) => {
                const value = e.target.value;
                updateFormData({ dob: value });
                setErrors((prev) => ({
                  ...prev,
                  dob: validateDOB(value) || undefined,
                }));
              }}
            />

            {errors.dob && <p className="error-text">{errors.dob}</p>}
          </div>

          <div className="form-group-step3">
            <label>
              Country: <span className="required">*</span>
            </label>
            <select
              value={formData.country}
              onChange={(e) => {
                const value = e.target.value;
                handleCountryChange(value); // updates country, resets state/city
                setErrors((prev) => ({
                  ...prev,
                  country: validateCountry(value) || undefined,
                }));
              }}
            >
              <option value="">Select Country</option>
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            {errors.country && <p className="error-text">{errors.country}</p>}
          </div>
        </div>

        <div className="form-row">
          {/* State */}
          <div className="form-group-step3">
            <label>
              State: <span className="required">*</span>
            </label>
            <select
              value={formData.state}
              onChange={(e) => {
                const value = e.target.value;
                updateFormData({ state: value });
                setErrors((prev) => ({
                  ...prev,
                  state: validateState(value) || undefined,
                }));
              }}
              disabled={!formData.country}
            >
              <option value="">Select State</option>
              {states.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            {errors.state && <p className="error-text">{errors.state}</p>}
          </div>

          {/* City */}
          <div className="form-group-step3">
            <label>
              City: <span className="required">*</span>
            </label>
            <select
              value={formData.city}
              onChange={(e) => {
                const value = e.target.value;
                updateFormData({ city: value });
                setErrors((prev) => ({
                  ...prev,
                  city: validateCity(value) || undefined,
                }));
              }}
              disabled={!formData.state}
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            {errors.city && <p className="error-text">{errors.city}</p>}
          </div>
        </div>

        <label>
          Subscription Plan: <span className="required">*</span>
        </label>
        <div>
          {["Basic", "Pro", "Enterprise"].map((plan) => (
            <label key={plan} style={{ marginRight: 10 }}>
              <input
                type="radio"
                name="subscriptionPlan"
                value={plan}
                checked={formData.subscriptionPlan === plan}
                onChange={() => updateFormData({ subscriptionPlan: plan })}
              />
              {plan}
            </label>
          ))}
        </div>
        {errors.subscriptionPlan && (
          <p className="error-text">{errors.subscriptionPlan}</p>
        )}

        <label>
          <input
            type="checkbox"
            checked={formData.newsletter}
            onChange={() =>
              updateFormData({ newsletter: !formData.newsletter })
            }
          />
          Subscribe to Newsletter
        </label>

        <div className="form-actions">
          <button onClick={prevStep}>Back</button>
          <button onClick={handleNext}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default Step3Preferences;
