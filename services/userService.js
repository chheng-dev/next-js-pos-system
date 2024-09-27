import axios from "axios";

const API_URL_BASE = process.env.NEXT_PUBLIC_BASE_API_URL;

export const UserService = {
  async getUserList() {
    try {
      const res = await axios.get(`http://localhost:3000/api/users`, {
        method: 'GET',
        headers: {
          "Content-Type": 'application/json'
        }
      });
      return res.data;
    } catch (error) {
      console.error("Error fetching user list:", error);
      throw error;
    }
  },

  async createUser({ full_name, username, email, password, is_active, image }) {
    try {
      const passwordHash = await bcrypt.hash(password, 10);

      const res = await axios.post(`${API_URL_BASE}/api/users`, {
        full_name,
        username,
        email,
        password: passwordHash,
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
  },

  async updateUserActiveStatus(id, isActive) {
    try {
      const res = await axios.patch(`${API_URL_BASE}/api/update-user-active`, {
        id,
        isActive
      });

      return res.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "User not found or changes mate.");
    }
  },

  async getUserById(id) {
    try {
      const res = await axios.get(`${API_URL_BASE}/api/users/${id}`, {
        method: 'GET',
        headers: {
          "Content-Type": 'application/json'
        }
      });

      return res.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "User Id not found.");
    }
  },

  async assignRoleToUser(userId, roleId) {
    try {
      const res = await axios.post(`${API_URL_BASE}/api/users/${userId}/roles`, {
        roleId: roleId
      }, {
        headers: {
          "Content-Type": 'application/json'
        }
      });

      return res.data; // Returning the response data
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to assign role to the user.");
    }
  }
}