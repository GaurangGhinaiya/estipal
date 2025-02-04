// src/utils/apiUtils.js
import axiosInstance from "../services";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Function to fetch the country list
export const fetchCountryList = async () => {
  try {
    const response = await axiosInstance.get(
      `${BASE_URL}/countryList?show_all=true`
    );
    return response.payload?.data || []; // Adjust according to your API response structure
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
    const response = await axiosInstance.get(
      `${BASE_URL}/stateList?show_all=true`,
      { params }
    );
    return response.payload?.data || []; // Adjust according to your API response structure
  } catch (error) {
    console.error("Error fetching state list:", error);
    throw error;
  }
};

// Function to fetch the next estimator ID
export const fetchNextEstimatorId = async () => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/estimator/getNextId`);
    return response.payload?.data?.id || ""; // Adjust according to your API response structure
  } catch (error) {
    console.error("Error fetching next estimator ID:", error);
    throw error;
  }
};

// Function to fetch the next seller ID
export const fetchNextSellerId = async () => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/sellers/getNextId`);
    return response.payload?.data?.id || ""; // Adjust according to your API response structure
  } catch (error) {
    console.error("Error fetching next seller ID:", error);
    throw error;
  }
};
