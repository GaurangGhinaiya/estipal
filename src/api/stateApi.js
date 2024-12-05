export const stateApi = async (countryCode, currentState) => {
  const API_URL = "https://www.estipal.com/admin/seller/getState";

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        countryCode,
        currentState,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Request Error:", error);
    throw error;
  }
};
