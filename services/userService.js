import axios from "axios";

const API_URL_BASE = process.env.NEXT_PUBLIC_BASE_API_URL;

console.log("API_URL_BASE", API_URL_BASE)

export const UserService = {
  async getUserList() {
    try {
      const res = await axios.get(`http://localhost:3000/api/users`);
      return res.data;
    } catch (error) {
      console.error("Error fetching user list:", error);
      throw error;
    }
  },

  async createUser({ full_name, username, email, password, role, is_active, image }) {
    try {
      const passwordHash = await bcrypt.hash(password, 10);

      const res = await axios.post(`${API_URL_BASE}/api/users`, {
        full_name,
        username,
        email,
        password: passwordHash,
        role,
        is_active,
        image
      });

      return res.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "User registration failed");
    }
  },

  async deleteUserById(id) {
    try {
      const res = await axios.delete(`${API_URL_BASE}/api/users/${id}`);

      return res.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "User deletion failed");
    }
  }
}