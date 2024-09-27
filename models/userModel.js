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
  },

  async getUserById(userId) {
    try {
      const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
      if (result.rows.length === 0) {
        return null;
      }

      return result.rows[0];
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      throw new Error('Failed to fetch user data');
    }
  },

  async deleteUserById(id) {
    try {
      const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  async updateActiveUser(id, isActive) {
    try {
      const result = await pool.query('UPDATE users SET is_active = $1 WHERE id = $2 RETURNING *',
        [isActive, id]
      );

      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
};
