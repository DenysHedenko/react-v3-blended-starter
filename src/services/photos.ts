import axios from "axios";


const API_KEY = import.meta.env.VITE_API_KEY;
axios.defaults.baseURL = "https://api.pexels.com/v1/";
axios.defaults.headers.common["Authorization"] = API_KEY;
axios.defaults.params = {
  orientation: "landscape",
};

export const getPhotos = async (query: string, page: number = 1, per_page: number = 15) => {

  const { data }  = await axios.get("search", {
      params: { query, page, per_page },
    });
  return data;
};