// src/utils/apiUtils.js
import axiosInstance from "../services";

const BASE_URL = "http://192.168.29.178:8080/estipal/api/v1";

// Function to fetch the country list

// Function to fetch the country list
export const fetchCountryList = async (token) => {
  try {
    const response = await axiosInstance.get(`/countryList?show_all=${true}`);
    return response.payload.data; // Adjust according to your API response
  } catch (error) {
    console.error("Error fetching country list:", error);
    throw error;
  }
};

// Function to fetch the state list
export const fetchStateList = async (countryId, stateSearch = "") => {
  try {
    const params = {
      search: JSON.stringify({ iso: countryId }),
      state: stateSearch,
    };
    const response = await axiosInstance.get(`/stateList?show_all=${true}`, {
      params,
    });
    return response.payload.data; // Adjust according to your API response
  } catch (error) {
    console.error("Error fetching state list:", error);
    throw error;
  }
};
