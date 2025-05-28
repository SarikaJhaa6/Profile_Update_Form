const express = require("express");
const multer = require("multer");
const {
  registerUser,
  checkUsernameAvailability,
} = require("../controllers/userController");

const router = express.Router();

// Multer setup for profile photo upload (<= 2MB, JPG/PNG only)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "_")),
});

const fileFilter = (req, file, cb) => {
  if (!file.mimetype.match(/^image\/(jpeg|png)$/)) {
    cb(new Error("Only JPG and PNG files are allowed"), false);
  } else {
    cb(null, true);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter,
});

router.post("/register", upload.single("profilePhoto"), registerUser);
router.get("/check-username/:username", checkUsernameAvailability);

module.exports = router;
