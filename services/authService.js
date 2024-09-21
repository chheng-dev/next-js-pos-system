import axios from "axios";
import dotenv from "dotenv";
import bcrypt from "bcryptjs"
import { UserModel } from "@/models/userModel";

dotenv.config();

const API_URL_BASE = process.env.BASE_API_URL


export const authService = {
  async login(username, password) {
    try {
      const res = await axios.post(`${API_URL_BASE}/auth/login`, {
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
      const res = await axios.post(`${API_URL_BASE}/auth/logout`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return res.data
    } catch (err) {
      throw new Error("Logout failed");
    }
  },

  async register(username, email, password) {
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await UserModel.createUser({
      username,
      email,
      passwordHash,
    })

    return newUser;
  },
}