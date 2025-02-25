import axios from "axios";

const API_URL = "https://apiprofitplus.galaxydev.pk/api/points/earn";

/**
 * Function to post points to the API
 * @param {string} userId - The user's ID
 * @param {number} points - The points to be added
 * @returns {Promise<Object>} - API response
 */
const postPoints = async (userId, points) => {
  try {
    const response = await axios.post(API_URL, {
      userId: userId,
      points: points.toString(), // Ensure points are sent as a string
    });

    return response.data; // Return API response
  } catch (error) {
    console.error("Error posting points:", error.response?.data || error);
    throw error; // Throw error for handling in calling function
  }
};

export default postPoints;
