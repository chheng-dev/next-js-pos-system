import pool from '@/lib/db';

export const UserModel = {
  async createUser(full_name, username, email, password, role, is_active, image) {
    try {
      const result = await pool.query(
        'INSERT INTO users (full_name, username, email, password, role, is_active, image) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [full_name, username, email, password, role, is_active, image]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('User creation failed');
    }
  },

  async getUserList() {
    try {
      const result = await pool.query('SELECT * FROM users ORDER BY updated_at DESC;');
      return result.rows;
    } catch (error) {
      throw error;
    }
  }
};
