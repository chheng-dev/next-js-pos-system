import pool from '@/lib/db';
import bcrypt from "bcryptjs"

export const UserModel = {
  async createUser(full_name, username, email, password, is_active, image) {
    try {

      const hashPassword = await bcrypt.hash(password, 10)

      const result = await pool.query(
        'INSERT INTO users (full_name, username, email, password, is_active, image) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [full_name, username, email, hashPassword, is_active, image]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('User creation failed');
    }
  },

  // async getUserList() {
  //   try {
  //     const result = await pool.query('SELECT * FROM users ORDER BY updated_at DESC;');
  //     return result.rows;
  //   } catch (error) {
  //     throw error;
  //   }
  // },
  async getUserList() {
    try {
      const result = await pool.query(`
        SELECT 
          u.id AS id,
          u.username,
          u.email,
          u.full_name,
          u.is_active,
          r.id AS role_id,
          r.name AS role_name
        FROM
          users u
        LEFT JOIN user_roles ur ON u.id = ur.user_id
        LEFT JOIN roles r ON ur.role_id = r.id
        ORDER BY u.id
      `);

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

  async updateUser(id, data) {
    try {
      const updatedData = { ...data };

      if (data.password) {
        updatedData.password = await bcrypt.hash(data.password, 10);
      }

      const result = await pool.query(
        `UPDATE users SET 
          full_name = $1, 
          username = $2, 
          email = $3, 
          password = $4, 
          is_active = $5, 
          image = $6
        WHERE id = $7
        RETURNING *`,
        [
          updatedData.full_name,
          updatedData.username,
          updatedData.email,
          updatedData.password,
          updatedData.is_active,
          updatedData.image,
          id
        ]
      );

      if (result.rowCount === 0) {
        throw new Error('User not found');
      }

      return result.rows[0];
    } catch (error) {
      console.error('Error updating user:', error);
      throw new Error('Failed to update user data');
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
  },

  async getRolesByUserId(userId) {
    try {
      const result = await pool.query(`
        SELECT r.id, r.name
        FROM user_roles ur
        JOIN roles r ON ur.role_id = r.id
        WHERE ur.user_id = $1
      `, [userId]);

      return result.rows;
    } catch (error) {
      throw error;
    }
  },


  async addRoleToUser(userId, roleId) {
    try {
      pool.query(`
        INSERT INTO user_roles (user_id, role_id) VALUES ($1, $2)
      `, [userId, roleId]);
    } catch (error) {
      throw error;
    }
  },

  async removeRoleFromUser(userId, roleId) {
    try {
      await pool.query(`
        DELETE FROM user_roles
        WHERE user_id = $1 AND role_id = $2
      `, [userId, roleId]);

    } catch (error) {
      throw error;
    }
  }

};
