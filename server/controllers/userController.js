const User = require("../models/UserProfile");
const bcrypt = require("bcryptjs");

// Validation helpers
const isValidUsername = (username) => /^[^\s]{4,20}$/.test(username);
const isValidPassword = (password) =>
  password.length >= 8 &&
  /[!@#$%^&*(),.?":{}|<>]/.test(password) &&
  /\d/.test(password);

exports.checkUsernameAvailability = async (req, res) => {
  try {
    const username = req.params.username;
    if (!isValidUsername(username)) {
      return res
        .status(400)
        .json({ available: false, message: "Invalid username" });
    }
    const exists = await User.exists({ username });
    res.json({ available: !exists });
  } catch (error) {
    res.status(500).json({ error: "Server error checking username" });
  }
};

exports.registerUser = async (req, res) => {
  try {
    // Extract fields
    const {
      username,
      currentPassword,
      newPassword,
      profession,
      companyName,
      address,
      subscriptionPlan,
      newsletter,
    } = req.body;

    // Validate username
    if (!isValidUsername(username)) {
      return res
        .status(400)
        .json({ error: "Username must be 4-20 chars and no spaces" });
    }

    // Check username uniqueness
    const exists = await User.exists({ username });
    if (exists)
      return res.status(400).json({ error: "Username already taken" });

    // Validate password if changing
    let hashedPassword;
    if (newPassword) {
      if (!isValidPassword(newPassword)) {
        return res.status(400).json({
          error:
            "Password must be 8+ chars with at least one special character and one number",
        });
      }
      if (!currentPassword) {
        return res
          .status(400)
          .json({ error: "Current password required to change password" });
      }
      // Check current password if user exists - for new registration skip this, else you'd compare here.
      // For demo, we skip currentPassword verification.

      hashedPassword = await bcrypt.hash(newPassword, 10);
    } else {
      // If no new password, reject or hash some default password? For registration newPassword must be provided.
      return res.status(400).json({ error: "New password is required" });
    }

    // Validate Profession and Company Name logic
    if (
      profession === "Entrepreneur" &&
      (!companyName || companyName.trim() === "")
    ) {
      return res
        .status(400)
        .json({ error: "Company Name is required for Entrepreneurs" });
    }

    // Validate address JSON parse
    let parsedAddress;
    try {
      parsedAddress = JSON.parse(address);
    } catch {
      return res.status(400).json({ error: "Address must be valid JSON" });
    }
    if (
      !parsedAddress.line1 ||
      !parsedAddress.country ||
      !parsedAddress.state ||
      !parsedAddress.city
    ) {
      return res.status(400).json({ error: "Address fields are incomplete" });
    }

    // Profile photo path from multer
    if (!req.file) {
      return res.status(400).json({ error: "Profile photo is required" });
    }
    const profilePhotoPath = req.file.path;

    // Create user document
    const user = new User({
      profilePhoto: profilePhotoPath,
      username,
      password: hashedPassword,
      profession,
      companyName: profession === "Entrepreneur" ? companyName : "",
      address: parsedAddress,
      subscriptionPlan,
      newsletter: newsletter === "true" || newsletter === true,
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Register User Error:", error);
    res.status(500).json({ error: "Server error registering user" });
  }
};
