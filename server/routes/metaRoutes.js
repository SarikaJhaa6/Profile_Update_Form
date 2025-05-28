const express = require("express");
const router = express.Router();
const metaData = require("../utils/metaData");

router.get("/countries", (req, res) => {
  res.json(metaData.getCountries());
});

router.get("/states/:country", (req, res) => {
  const country = req.params.country;
  res.json(metaData.getStates(country));
});

router.get("/cities/:state", (req, res) => {
  const state = req.params.state;
  res.json(metaData.getCities(state));
});

module.exports = router;
