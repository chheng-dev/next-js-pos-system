import axios from "axios";

const API_URL_BASE = process.env.NEXT_PUBLIC_BASE_API_URL;

export const ProfileService = {
  async getProfile() {
    try {
      const res = await axios.get(`${API_URL_BASE}/api/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return res.data;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw error;
    }
  },
}