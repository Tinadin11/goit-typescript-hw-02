import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com";

export const fetchImages = async (query, page) => {
  const response = await axios.get("/search/photos", {
    params: {
      query,
      page,
      per_page: 12,
      client_id: "u56KqBptw2bcEuLFUNf0Yc1bCnowZ-iUV_NVzD_POSk", // твій ключ
      orientation: "landscape",
    },
  });
  return response.data; // Не забирай .results тут — заберемо в App.jsx
};

