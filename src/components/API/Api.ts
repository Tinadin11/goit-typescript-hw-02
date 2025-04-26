import axios from "axios";
import { Image } from "../App/App.types";

type FetchImagesResponse = {
  results: Image[];
  total: number;
  total_pages: number;
}

export const fetchImages = async (query: string, page: number): Promise<{ data: Image[], totalPages: number }> => {
  try {
    const response = await axios.get<FetchImagesResponse>("https://api.unsplash.com/search/photos", {
      params: {
        query,
        page,
        per_page: 12,
        client_id: "n3KsZi74Y-eohMe3bBOpVgVDyUqrjrqTgbEqJi_C4y0", // мій новий ключ API😁 стільки нервів зжер разом з інш.ключами😒
        orientation: "landscape",
      },
    });

    return {
      data: response.data.results,
      totalPages: response.data.total_pages,
    };
  } catch (error) {
    console.error("Error fetching images:", error);
    throw error;
  }
};

/* код з 4 дз із зауваженнями ментора
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
};*/

