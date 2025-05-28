// utils/metaData.js
const data = {
  countries: ["USA", "India"],
  states: {
    USA: ["California", "Texas"],
    India: ["Karnataka", "Maharashtra"],
  },
  cities: {
    California: ["Los Angeles", "San Francisco"],
    Texas: ["Houston", "Dallas"],
    Karnataka: ["Bangalore", "Mysore"],
    Maharashtra: ["Mumbai", "Pune"],
  },
};

const getCountries = () => data.countries;
const getStates = (country) => data.states[country] || [];
const getCities = (state) => data.cities[state] || [];

module.exports = {
  getCountries,
  getStates,
  getCities,
};
