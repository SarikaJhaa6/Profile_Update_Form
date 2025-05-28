const mongoose = require("mongoose");

const UserProfileSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  gender: { type: String, required: true }, // Male / Female / Other
  customGender: { type: String }, // Only if gender === "Other"
  password: { type: String }, // Hashed password (optional)
  profession: { type: String, required: true },
  companyName: { type: String },
  addressLine1: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  subscriptionPlan: { type: String, required: true },
  newsletter: { type: Boolean, default: false },
  profilePhoto: { type: String }, // store filename or URL
});

const UserProfile = mongoose.model("UserProfile", UserProfileSchema);

module.exports = UserProfile;
