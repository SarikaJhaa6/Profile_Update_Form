import React, { createContext, useState, useCallback } from "react";

export const UserFormContext = createContext();

const initialData = {
  profilePhoto: null,
  username: "",
  currentPassword: "",
  newPassword: "",
  profession: "Student",
  companyName: "",
  addressLine1: "",
  country: "",
  state: "",
  city: "",
  subscriptionPlan: "Basic",
  newsletter: true,
  gender: "", // added for dynamic gender input
  otherGender: "", // if gender === 'Other', this field is shown
  dob: "", // Date of Birth field for disabling future dates
};

export const UserFormProvider = ({ children }) => {
  const [formData, setFormData] = useState(initialData);
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const updateFormData = useCallback((newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  }, []);

  // Reset address fields on country change
  const handleCountryChange = (country) => {
    setFormData((prev) => ({
      ...prev,
      country,
      state: "",
      city: "",
    }));
  };

  // Clear all form data & reset step
  const clearFormData = () => {
    setFormData(initialData);
    setStep(1);
  };

  return (
    <UserFormContext.Provider
      value={{
        formData,
        updateFormData,
        step,
        nextStep,
        prevStep,
        handleCountryChange,
        clearFormData, // expose clearFormData here
      }}
    >
      {children}
    </UserFormContext.Provider>
  );
};
