const express = require("express");
const multer = require("multer");
const path = require("path");
const UserProfile = require("../models/UserProfile");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    ),
});

const upload = multer({ storage });

router.post("/profile", upload.single("profilePhoto"), async (req, res) => {
  try {
    const {
      username,
      fullName,
      gender,
      customGender,
      profession,
      companyName,
      addressLine1,
      city,
      state,
      country,
      subscriptionPlan,
      newsletter,
    } = req.body;

    const profilePhoto = req.file ? req.file.filename : null;

    const genderFinal = gender === "Other" ? customGender : gender;

    const newUserProfile = new UserProfile({
      username,
      fullName,
      gender: genderFinal,
      profession,
      companyName,
      addressLine1,
      city,
      state,
      country,
      subscriptionPlan,
      newsletter: newsletter === "true" || newsletter === true,
      profilePhoto,
    });

    await newUserProfile.save();

    return res.status(201).json({ message: "Profile saved successfully." });
  } catch (error) {
    console.error("Error saving profile:", error);
    return res.status(500).json({ message: "Server error" });
  }
});
  

module.exports = router;
