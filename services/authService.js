import axios from "axios";
import bcrypt from "bcryptjs"
import { UserModel } from "@/models/userModel";

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

  async register({ full_name, username, email, password, role, is_active, image }) {
    try {
      // Hash the password
      const passwordHash = await bcrypt.hash(password, 10);

      const res = await axios.post(`${API_URL_BASE}/api/auth/register`, {
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
  }


}