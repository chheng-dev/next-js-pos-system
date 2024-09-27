import pool from "@/lib/db";

export class PermissionModel {
  static async createPermission(name) {
    try {
      const result = await pool.query('INSERT INTO permissions (name) VALUES ($1) RETURNING *', [name]);

      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async getPermissionsList() {
    try {
      const result = await pool.query('SELECT * FROM permissions');
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  static async updatePermission(id, { name }) {
    try {
      const result = await pool.query('UPDATE permissions SET name = $1 WHERE id = $2 RETURNING *', [name, id]);

      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async deletePermission(id) {
    await pool.query('DELETE FROM permissions WHERE id = $1', [id]);
  }


  static async assignPermissionToRole(roleId, permissionId) {
    try {
      const result = await pool.query('INSERT INTO role_permissions (role_id, permission_id) VALUES ($1, $2) RETURNING *', [roleId, permissionId]);

      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async getPermissionById(id) {
    try {
      const result = await pool.query('SELECT * FROM permissions  WHERE id = $1', [id]);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  // static async getPermissionsByRole(roleId) {
  //   try {
  //     const result = await pool.query(`
  //       SELECT p.* FROM permissions p
  //       INNER JOIN role_permissions rp ON p.id = rp.permission_id
  //       WHERE rp.role_id = $1`, [roleId]);

  //     return result.rows[0];
  //   } catch (error) {
  //     throw error;
  //   }
  // }
}