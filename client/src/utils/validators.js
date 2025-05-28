// Username: 4-20 chars, no spaces
export const validateUsername = (username) => {
  if (!username) return "Username is required";
  if (username.length < 4 || username.length > 20)
    return "Username must be 4-20 characters";
  if (/\s/.test(username)) return "Username cannot contain spaces";
  return "";
};

// Password: 8+ chars, 1 special char, 1 number
export const validateNewPassword = (password) => {
  if (!password) return "New password is required";
  if (password.length < 8) return "Password must be at least 8 characters";
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
    return "Password must contain at least 1 special character";
  if (!/\d/.test(password)) return "Password must contain at least 1 number";
  return "";
};

// Current password required if new password filled
export const validateCurrentPassword = (currentPassword, newPassword) => {
  if (newPassword && !currentPassword)
    return "Current password is required to change password";
  return "";
};

// Full Name: Required, at least 2 characters
export const validateFullName = (fullName) => {
    if (!fullName || fullName.trim().length < 2) {
      return "Full name is required and must be at least 2 characters";
    }
    return "";
  };
  
  // Gender: Required (either Male, Female, or a valid 'Other' input)
  export const validateGender = (gender, customGender) => {
    if (!gender) return "Gender is required";
    if (gender === "Other" && (!customGender || customGender.trim().length < 2)) {
      return "Please specify your gender (at least 2 characters)";
    }
    return "";
  };
  

// Profile photo: required, JPG/PNG, <= 2MB
export const validateProfilePhoto = (file) => {
  if (!file) return "Profile photo is required";
  if (!["image/jpeg", "image/png"].includes(file.type))
    return "Only JPG or PNG allowed";
  if (file.size > 2 * 1024 * 1024) return "File size must be <= 2MB";
  return "";
};

// Address Line 1 required
export const validateAddressLine1 = (address) => {
  if (!address) return "Address Line 1 is required";
  return "";
};

// Company Name required if profession is Entrepreneur
export const validateCompanyName = (profession, companyName) => {
  if (profession === "Entrepreneur" && !companyName)
    return "Company Name is required for Entrepreneurs";
  return "";
};

export const validateCountry = (country) => {
  if (!country) return "Country is required";
  return "";
};

export const validateState = (state) => {
  if (!state) return "State is required";
  return "";
};

export const validateCity = (city) => {
  if (!city) return "City is required";
  return "";
};
  
// Date of Birth not future date
export const validateDOB = (dob) => {
  if (!dob) return "Date of Birth is required";
  const today = new Date();
  const inputDate = new Date(dob);
  if (inputDate > today) return "Date of Birth cannot be a future date";
  return "";
};

// Validate subscription plan (must be one of the options)
export const validateSubscriptionPlan = (plan) => {
  const validPlans = ["Basic", "Pro", "Enterprise"];
  if (!validPlans.includes(plan)) return "Subscription plan is required";
  return "";
};
