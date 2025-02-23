import axios from "axios";
import API_URL from "./api";

/**
 * Fetch user score from API.
 * @param {string} userId - The user ID to fetch the score for.
 * @returns {Promise<object>} - Resolves with { score } or rejects with an error message.
 */
const getUserScore = async (userId) => {
  if (!userId) throw new Error("User ID is required");

  try {
    const response = await axios.get(`${API_URL}/api/score/${userId}`);
    if (response.data.success) {
      return response.data.score;
    } else {
      throw new Error("Failed to fetch score.");
    }
  } catch (error) {
    throw new Error(error.message || "Could not retrieve score.");
  }
};

export default getUserScore;
