// models/userModel.js
import pool from '@/lib/db';

export const UserModel = {
  async createUser({ username, email, passwordHash }) {
    try {
      const result = await pool.query(
        'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
        [username, email, passwordHash]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('User creation failed');
    }
  }
};
