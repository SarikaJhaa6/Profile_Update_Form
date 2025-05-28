import axios from "axios";

const API_BASE = "http://localhost:5000"; // update if your backend URL differs

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// Username availability check
export const checkUsernameAvailability = async (username) => {
  try {
    const res = await api.get(`/api/user/check-username/${username}`);
    return res.data.available;
  } catch {
    return false;
  }
};

export const fetchCountries = async () => {
  try {
    const res = await api.get("/api/meta/countries");
    // If API returns plain array, return it directly:
    return Array.isArray(res.data) ? res.data : [];
  } catch (err) {
    console.error("Failed to fetch countries:", err);
    return [];
  }
};
  
export const fetchStates = async (country) => {
  try {
    const res = await api.get(`/api/meta/states/${country}`);
    return Array.isArray(res.data) ? res.data : [];
  } catch (err) {
    console.error("Failed to fetch states:", err);
    return [];
  }
};

export const fetchCities = async (state) => {
  try {
    const res = await api.get(`/api/meta/cities/${state}`);
    return Array.isArray(res.data) ? res.data : [];
  } catch (err) {
    console.error("Failed to fetch cities:", err);
    return [];
  }
};
  
// Submit user profile form
export const submitUserProfile = async (data) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (key === "profilePhoto") {
      formData.append("profilePhoto", value);
    } else {
      formData.append(key, value);
    }
  });

  const res = await api.post("/api/users/profile", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};

export default api;
