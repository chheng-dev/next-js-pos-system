import axios from "axios";
import bcrypt from "bcryptjs"

const API_URL_BASE = process.env.NEXT_PUBLIC_BASE_API_URL


export const authService = {
  async login(username, password) {
    try {
      const res = await axios.post(`${API_URL_BASE}/api/auth/login`, {
        username,
        password
      });

      return res.data;
    } catch (error) {
      throw new Error(error.response.data.message || "Authentication failed");
    }
  },

  async logout(token) {
    try {
      const res = await axios.post(`${API_URL_BASE}/api/auth/logout`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return res.data
    } catch (err) {
      throw new Error("Logout failed");
    }
  },

  async register({ full_name, username, email, password, is_active, image, roleId }) {
    try {
      // Hash the password
      const passwordHash = await bcrypt.hash(password, 10);

      const res = await axios.post(`${API_URL_BASE}/api/auth/register`, {
        full_name,
        username,
        email,
        password: passwordHash,
        is_active,
        image
      });

      const createdUser = res.data;

      if (!createdUser || !createdUser.id) {
        throw new Error("User registration failed: Invalid response");
      }

      if (roleId) {
        const roleResponse = await axios.post(`${API_URL_BASE}/api/users/${createdUser.id}/roles`, {
          roleId
        });

        if (roleResponse.status !== 200) {
          throw new Error("Role assignment failed");
        }
      }

      return {
        ...createdUser,
        roleId
      };
    } catch (error) {
      throw new Error(error.response?.data?.message || "User registration failed");
    }
  }
}