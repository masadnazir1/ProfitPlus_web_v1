import axios from "axios";

const API_URL = "https://apiprofitplus.galaxydev.pk/api/points";

/**
 * Function to post points to the API
 * @param {string} userId - The user's ID
 * @param {number} points - The points to be added
 * @returns {Promise<Object>} - API response
 */
const GETPOINTS = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}`);

    return response.data; // Return API response
  } catch (error) {
    console.error("Error posting points:", error.response?.data || error);
    throw error; // Throw error for handling in calling function
  }
};

export default GETPOINTS;
