import axios from "axios";

const API_URL_BASE = process.env.NEXT_PUBLIC_BASE_API_URL;

export const RoleService = {
  async getAllRole() {
    try {
      const res = await axios.get(`${API_URL_BASE}/api/roles`, {
        method: 'GET',
        headers: {
          "Content-Type": 'application/json'
        }
      });
      return res.data;
    } catch (error) {
      console.error("Error fetching roles list:", error);
      throw error;
    }
  }
}